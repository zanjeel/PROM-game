import React, {useEffect, useRef, useState, useMemo} from "react"
import {useGLTF, useAnimations} from '@react-three/drei'
import { SkeletonUtils } from "three-stdlib";
import { useFrame, useGraph } from "@react-three/fiber";
// import {useAtom, atom} from "jotai"
// import { userAtom } from "./SocketManager";
import useAppStore from "../store/store";

// const MOVEMENT_SPEED= 0.09


export function Avatar({
  id, 
  key,
  ...props
}){
  // const position = useMemo(()=> props.position, [])
  const group = useRef()
 console.log("my id inside malechar is:", id)
  const { scene, materials, animations  } = useGLTF('/assets/3d/MaleChar.glb')

 //skinned meshes cannot be reused in three.js w/ cloning them 
 const clone= useMemo(()=> SkeletonUtils.clone(scene), [scene])
 const {nodes} = useGraph(clone)

 const { actions } = useAnimations(animations, group)
 const position = useMemo(()=> props.position, [])

 const characterState = useAppStore((state) => state.characterState);
console.log("character state:", characterState)
 useEffect(() => {
  actions[characterState].reset().fadeIn(0.2).play();
  return () => {
    actions[characterState]?.fadeOut(0.2);
  };
}, [characterState, actions]);


// rotation={[Math.PI / 2, 0, 0]}
//position={position}
return (
 <group ref={group} {...props} position={position} dispose={null}>
      <group name="Scene">
        <group name="idle" rotation={[Math.PI /2, 0 ,Math.PI ]}  scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <group name="Wolf3D_Outfit_Top002">
            <skinnedMesh name="Wolf3D_Outfit_Top001" geometry={nodes.Wolf3D_Outfit_Top001.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top001.skeleton} />
            <skinnedMesh name="Wolf3D_Outfit_Top001_1" geometry={nodes.Wolf3D_Outfit_Top001_1.geometry} material={materials['Material.001']} skeleton={nodes.Wolf3D_Outfit_Top001_1.skeleton} />
            <skinnedMesh name="Wolf3D_Outfit_Top001_2" geometry={nodes.Wolf3D_Outfit_Top001_2.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.Wolf3D_Outfit_Top001_2.skeleton} />
            <skinnedMesh name="Wolf3D_Outfit_Top001_3" geometry={nodes.Wolf3D_Outfit_Top001_3.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Outfit_Top001_3.skeleton} />
            <skinnedMesh name="Wolf3D_Outfit_Top001_4" geometry={nodes.Wolf3D_Outfit_Top001_4.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Outfit_Top001_4.skeleton} />
            <skinnedMesh name="Wolf3D_Outfit_Top001_5" geometry={nodes.Wolf3D_Outfit_Top001_5.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Outfit_Top001_5.skeleton} />
            <skinnedMesh name="Wolf3D_Outfit_Top001_6" geometry={nodes.Wolf3D_Outfit_Top001_6.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Top001_6.skeleton} />
            <skinnedMesh name="Wolf3D_Outfit_Top001_7" geometry={nodes.Wolf3D_Outfit_Top001_7.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Top001_7.skeleton} />
            <skinnedMesh name="Wolf3D_Outfit_Top001_8" geometry={nodes.Wolf3D_Outfit_Top001_8.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Outfit_Top001_8.skeleton} />
          </group>
        </group>
      </group>
    </group>
);
}



// useFrame((state)=>{
//  if(group.current.position.distanceTo(props.position)>0.1){
   
//    const direction=group.current.position.clone().sub(props.position).normalize().multiplyScalar(MOVEMENT_SPEED)

//    group.current.position.sub(direction)
//    group.current.lookAt(props.position)
//    setAnimation("run")
//    // rigidbody.current.applyImpulse(direction, true)
  
//  } else{
//    setAnimation("idle")
//  }
//  //camera following
// // console.log(`charactercontrols are: ${characterControlsEnabled} `)
//  if(id===user){
//    // Calculate the distance between the camera and the character
//  const distance = Math.sqrt(
//    Math.pow(state.camera.position.x - group.current.position.x, 2) +
//    Math.pow(state.camera.position.y - group.current.position.y, 2) +
//    Math.pow(state.camera.position.z - group.current.position.z, 2)
//  );

//  // Define the maximum zoom out distance
//  const maxZoomOutDistance = 6; // Adjust this value as needed

//  // Clamp the distance to the maximum zoom out distance
//  const clampedDistance = Math.min(distance, maxZoomOutDistance);

//  // Calculate the new camera position based on the clamped distance
//  const newX = group.current.position.x + (state.camera.position.x - group.current.position.x) * (clampedDistance / distance);
//  const newY = group.current.position.y + (state.camera.position.y - group.current.position.y) * (clampedDistance / distance);
//  const newZ = group.current.position.z + (state.camera.position.z - group.current.position.z) * (clampedDistance / distance);

//  // Update the camera position
//  state.camera.position.x = newX;
//  state.camera.position.y = newY;
//  state.camera.position.z = newZ;

//  // Look at the character
//  state.camera.lookAt(group.current.position);
//  }
// })

//   return (
//     <group ref={group} {...props} position={position} dispose={null}>
//       <group name="Scene">
//         <group name="idle" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
//           <primitive object={nodes.mixamorigHips} />
//           <group name="Wolf3D_Outfit_Top002">
//             <skinnedMesh name="Wolf3D_Outfit_Top001" geometry={nodes.Wolf3D_Outfit_Top001.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top001.skeleton} />
//             <skinnedMesh name="Wolf3D_Outfit_Top001_1" geometry={nodes.Wolf3D_Outfit_Top001_1.geometry} material={materials['Material.001']} skeleton={nodes.Wolf3D_Outfit_Top001_1.skeleton} />
//             <skinnedMesh name="Wolf3D_Outfit_Top001_2" geometry={nodes.Wolf3D_Outfit_Top001_2.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.Wolf3D_Outfit_Top001_2.skeleton} />
//             <skinnedMesh name="Wolf3D_Outfit_Top001_3" geometry={nodes.Wolf3D_Outfit_Top001_3.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Outfit_Top001_3.skeleton} />
//             <skinnedMesh name="Wolf3D_Outfit_Top001_4" geometry={nodes.Wolf3D_Outfit_Top001_4.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Outfit_Top001_4.skeleton} />
//             <skinnedMesh name="Wolf3D_Outfit_Top001_5" geometry={nodes.Wolf3D_Outfit_Top001_5.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Outfit_Top001_5.skeleton} />
//             <skinnedMesh name="Wolf3D_Outfit_Top001_6" geometry={nodes.Wolf3D_Outfit_Top001_6.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Top001_6.skeleton} />
//             <skinnedMesh name="Wolf3D_Outfit_Top001_7" geometry={nodes.Wolf3D_Outfit_Top001_7.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Top001_7.skeleton} />
//             <skinnedMesh name="Wolf3D_Outfit_Top001_8" geometry={nodes.Wolf3D_Outfit_Top001_8.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Outfit_Top001_8.skeleton} />
//           </group>
//         </group>
//       </group>
//     </group>
//   )
// }

useGLTF.preload('/assets/3d/MaleChar.glb')
