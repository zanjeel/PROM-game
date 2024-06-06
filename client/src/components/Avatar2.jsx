import React, {useEffect, useRef, useState, useMemo} from "react"
import {useGLTF, useAnimations,  OrbitControls, useKeyboardControls, Billboard,CameraControls } from '@react-three/drei'
import { SkeletonUtils } from "three-stdlib";
import { useFrame, useGraph, useThree  } from "@react-three/fiber";
import useAppStore from "../store/store";
import { CapsuleCollider, RigidBody, vec3 } from "@react-three/rapier";
// import directionOffset from "./helpers/directionOffset";
import { Quaternion, Vector3 } from "three";

import { Html } from '@react-three/drei'
import * as THREE from 'three';
import { userAtom } from "./SocketManager";
import {useAtom} from "jotai"

import { TextureLoader } from 'three'; 
import { Circle } from '@react-three/drei';
import popupImage from "/assets/3d/npc-pop.svg"; 

const directionOffset = ({ left, right, forward, back }) => {
	let directionOffset = 0;

	if (forward) {
		if (left) {
			directionOffset = Math.PI / 4;
		} else if (right) {
			directionOffset = -Math.PI / 4;
		}
	} else if (back) {
		if (left) {
			directionOffset = Math.PI / 4 + Math.PI / 2;
		} else if (right) {
			directionOffset = -Math.PI / 4 - Math.PI / 2;
		} else {
			directionOffset = Math.PI;
		}
	} else if (left) {
		directionOffset = Math.PI / 2;
	} else if (right) {
		directionOffset = -Math.PI / 2;
	}
    
	return directionOffset;
};

export function Avatar2({
  id, 
  avatarUrl= "https://models.readyplayer.me/6648bb572bf045a7997bfa9a.glb",
  ...props
}){
 
const [user]= useAtom(userAtom)


    //CharacterController
const position = useMemo(()=> props.position, [])
 // Create rigidposition by adding 1.1 to the y-coordinate of position
 const modifiedposition = [...position];
 modifiedposition[1] += 1.1;

const rigidposition = useMemo(()=> props.rigidposition, [])

const characterState = useAppStore((state) => state.characterState);
const setCharacterState = useAppStore((state) => state.setCharacterState);

 const camera = useThree((state) => state.camera);

 const controls = useKeyboardControls((state) => state);

 const rigidbody = useRef();
 const avatar = useRef()

 const controlsRef = useRef();

 const walkDirection = useMemo(() => new Vector3(), []); 
 const rotateAngle = useMemo(() => new Vector3(0, 1, 0), []);
 const cameraTarget = useMemo(() => new Vector3(), []);
 const rotateQuaternion = useMemo(() => new Quaternion(), []);

 let angleYCameraDirection;
 let newDirectionOffset;

 let positions = new Vector3();

 let moveX;
 let moveZ;

const group = useRef();
const { scene  } = useGLTF(avatarUrl)

 //skinned meshes cannot be reused in three.js w/ cloning them 
 const clone= useMemo(()=> SkeletonUtils.clone(scene), [scene])
 const {nodes} = useGraph(clone)

 const { animations: walkAnimation } = useGLTF("/animations/M_Walk_001.glb");
 const { animations: danceAnimation } = useGLTF("/animations/M_Dances_001.glb" );
 const { animations: idleAnimation } = useGLTF("/animations/M_Standing_Idle_001.glb");

 const { actions } = useAnimations(
   [walkAnimation[0], idleAnimation[0], danceAnimation[0]], avatar);



// useEffect(() => {
//   // Calculate the distance between the camera and the 3D object
//   const distance = camera.position.distanceTo(objectPosition);

//   // If the distance is less than a certain threshold, open the popup
//   if (distance < 3) {
//     setPopupVisible(true);
//   } else {
//     setPopupVisible(false);
//   }
// }, [camera.position]);

useEffect(() => {
    // if(id===user){
    actions[characterState].reset().fadeIn(0.4).play();
    
    return () => {
       
      actions[characterState]?.fadeOut(0.4);
        
    };
  // }
  }, [id, user, characterState]);
  
 

  // Following camera to character
  useFrame(({ camera }) => {
    //works without character.current too
    console.log("id is..:", id)
    console.log("user is..:", user)
    if (id===user) {
        const position = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();

        // Decompose the character's world matrix to get global position and rotation
       group.current.matrixWorld.decompose(position, quaternion, new THREE.Vector3());

        // Calculate the backward direction from the character
        const backward = new THREE.Vector3(0, 0, 1); // Default backward direction
        backward.applyQuaternion(quaternion); // Rotate the backward vector by the character's rotation
        backward.normalize();

        // Position the camera behind the character
        const cameraDistance = 2; // Distance behind the character
        const cameraHeight = 2; // Height above the character's base position
        const cameraOffset = backward.multiplyScalar(cameraDistance).add(new THREE.Vector3(0, cameraHeight, 0));
        const cameraPosition = position.clone().add(cameraOffset);

        // Update camera position smoothly
        camera.position.lerp(cameraPosition, 0.05); // Use lerp for smoother transition

        // Make the camera look at the character slightly from above
        const lookAtPosition = position.clone().add(new THREE.Vector3(0, 1, 0)); // Adjust y value to offset the height
        camera.lookAt(lookAtPosition);
    }
});

//too look around scene
const updateCameraTarget = (moveX, moveZ, position) => {
    camera.position.x += moveX;
    camera.position.z += moveZ;

    cameraTarget.x = position.x + moveX;
    cameraTarget.y = position.y;
    cameraTarget.z = position.z + moveZ;

    if (controlsRef.current) controlsRef.current.target = cameraTarget;
};

useEffect(() => {
    camera.position.y = 1;
    camera.position.z = 2;
    updateCameraTarget(0, 0, vec3(rigidbody.current.translation()));
}, []);

useEffect(() => {
		if ( avatar.current && rigidbody.current && group.current && Object.keys(controls).some((key) => controls[key])) {
            setCharacterState("M_Walk_001");      
            
		} else {
			setCharacterState("M_Standing_Idle_001");
		}      
	}, [controls, setCharacterState]);

useFrame((state, delta) => {
  
    if ( rigidbody.current && group.current && characterState === "M_Walk_001" ) {
      const hips = avatar.current.getObjectByName("Hips");
      hips.position.set(0, hips.position.y, 0);

      positions = vec3(rigidbody.current.translation());

        angleYCameraDirection = Math.atan2(
            camera.position.x - positions.x,
            camera.position.z - positions.z
        );

        newDirectionOffset = directionOffset(controls);

        rotateQuaternion.setFromAxisAngle(
            rotateAngle,
            angleYCameraDirection + newDirectionOffset
        );

        group.current.quaternion.rotateTowards(rotateQuaternion, 0.2);
        
        camera.getWorldDirection(walkDirection);
        walkDirection.y = 0;
        walkDirection.normalize();
        walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

        moveX = walkDirection.x * delta;
        moveZ = walkDirection.z * delta;

        rigidbody.current.setTranslation(
            { x: positions.x + moveX, 
              y: positions.y, 
              z: positions.z + moveZ },
            true
        );
        
        updateCameraTarget(moveX, moveZ, positions);
        // socket.emit("keyboardState", controls);
        //socket.emit("move", { id, position: [positions.x + moveX, positions.y, positions.z + moveZ] });

    }
});

console.log("positions is now", positions)

console.log("position in Avatar2.jsx: ", position)
// rotation={[Math.PI / 2, 0, 0]}
//position={position}

return (
    <>
     <OrbitControls ref={controlsRef} enableZoom={false}></OrbitControls>
     <RigidBody
        ref={rigidbody}
        enabledRotations={[false, false, false]}
        // position={[0, 0.1, 0]}
        position= {position}
        linearDamping={6}
        colliders={false}
                
	> 
    <CapsuleCollider   
        args={[0.8, 0.4]}
        position={rigidposition}
	/>
    <group ref={group}   position={position} {...props} dispose={null} name={`character-${id}`}>
     <primitive rotation={[Math.PI, 0 ,Math.PI ]} object={clone} ref={avatar}  />
    </group>
    </RigidBody>
    </>
);
}


// useGLTF.preload("/models/Animated Woman.glb");
useGLTF.preload("/animations/M_Walk_001.glb");
useGLTF.preload("/animations/M_Standing_Idle_001.glb");
useGLTF.preload("/animations/M_Dances_001.glb");