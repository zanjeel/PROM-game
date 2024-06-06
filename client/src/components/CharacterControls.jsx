import { CapsuleCollider, RigidBody, vec3 } from "@react-three/rapier";
import Demon from "./Demon";
import directionOffset from "./helpers/directionOffset";
import { OrbitControls, useKeyboardControls, CameraControls } from "@react-three/drei";
import { Quaternion, Vector3 } from "three";
import useAppStore from "../store/store";
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import { Avatar } from "./Avatar";
import { charactersAtom, socket } from "./SocketManager";
import {useAtom} from "jotai"



function CharacterControls() {
	const characterState = useAppStore((state) => state.characterState);
	const setCharacterState = useAppStore((state) => state.setCharacterState);

	const camera = useThree((state) => state.camera);

	const controls = useKeyboardControls((state) => state);

	const rigidbody = useRef();
	const characterRef = useRef();
	const controlsRef = useRef();

	const walkDirection = useMemo(() => new Vector3(), []);
	const rotateAngle = useMemo(() => new Vector3(0, 1, 0), []);
	const cameraTarget = useMemo(() => new Vector3(), []);
	const rotateQuaternion = useMemo(() => new Quaternion(), []);

	let angleYCameraDirection;
	let newDirectionOffset;
	let position = new Vector3();
	let moveX;
	let moveZ;


    const [characters]= useAtom(charactersAtom)
	// console.log("characters", characters)
   // Following camera to character
    useFrame(({ camera }) => {
		//works without character.current too
        if (characterRef.current && characterState === "run") {
            const position = new THREE.Vector3();
            const quaternion = new THREE.Quaternion();

            // Decompose the character's world matrix to get global position and rotation
            characterRef.current.matrixWorld.decompose(position, quaternion, new THREE.Vector3());

            // Calculate the backward direction from the character
            const backward = new THREE.Vector3(0, 0, 1); // Default backward direction
            backward.applyQuaternion(quaternion); // Rotate the backward vector by the character's rotation
            backward.normalize();

            // Position the camera behind the character
            const cameraDistance = 3; // Distance behind the character
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
        cameraTarget.y = position.y + 1;
        cameraTarget.z = position.z + moveZ;

        if (controlsRef.current) controlsRef.current.target = cameraTarget;
    };

	useEffect(() => {
		camera.position.y = 1;
		camera.position.z = 2;
		updateCameraTarget(0, 0, vec3(rigidbody.current.translation()));
	}, []);

	// useEffect(() => {
	// 	if (Object.keys(controls).some((key) => controls[key])) {
			
	// 	} else {
	// 		setCharacterState("idle");
	// 	}
        
	// }, [controls, setCharacterState]);

	useFrame((state, delta) => {
		if (user==id && Object.keys(controls).some((key) => controls[key])) {
			position = vec3(rigidbody.current.translation());

			angleYCameraDirection = Math.atan2(
				camera.position.x - position.x,
				camera.position.z - position.z
			);

			newDirectionOffset = directionOffset(controls);

			rotateQuaternion.setFromAxisAngle(
				rotateAngle,
				angleYCameraDirection + newDirectionOffset
			);

			characterRef.current.quaternion.rotateTowards(rotateQuaternion, 0.2);

			camera.getWorldDirection(walkDirection);
			walkDirection.y = 0;
			walkDirection.normalize();
			walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

			moveX = walkDirection.x * 0.08;
			moveZ = walkDirection.z * 0.08;

			rigidbody.current.setTranslation(
				{ x: position.x + moveX, 
				  y: position.y, 
				  z: position.z + moveZ },
				true
			);

			updateCameraTarget(moveX, moveZ, position);
			setCharacterState("run");
			// Send movement data to server
			socket.emit("move", [position.x + moveX, position.y, position.z + moveZ]
			);

			//Emit movement update to the server for each character
			// characters.forEach((character) => {
			// 	socket.emit("characterMove", {
			// 		id: character.id,
			// 		position: [position.x + moveX, position.y, position.z + moveZ]
			// 	});
			// });
		}
		else {
			setCharacterState("idle");
		}
	});
	console.log("characters CharacterController:", characters)
	return (
		<>
	  <OrbitControls ref={controlsRef} enableZoom={false} enablePan={false}></OrbitControls>
		{characters.map((character) => (	
			<RigidBody
				ref={rigidbody}
				enabledRotations={[false, false, false]}
                position= {new THREE.Vector3(
				character.position[0], 
				character.position[1],
				character.position[2])}
				linearDamping={6}
				colliders={false}
                
			>
				<CapsuleCollider 
				args={[0.8, 0.4]} 
				position= {new THREE.Vector3(
					character.position[0], 
					character.position[1] + 1.1,
					character.position[2])} 
				/>

				{/* <group ref={characterRef}>
					<MaleChar/>
				</group> */}
				
				
					<group ref={characterRef}>		
						<Avatar
						id= {character.id}
						key= {character.id}
						position= {new THREE.Vector3(
							character.position[0], 
							character.position[1],
							character.position[2])}
						/>
					</group>
				

					
				
			</RigidBody>
	  ))}
	</>
	);
}

export default CharacterControls;
