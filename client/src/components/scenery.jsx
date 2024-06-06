import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { SceneryColliders } from "./colliders/scenery-colliders";
import { ObjectsColliders } from "./colliders/objects-colliders";
import { Board } from "./board";
import boards from "../data/boards-light-data.json";
import {IconInfo} from "./IconInfo"
import { Html, Preload, OrbitControls, Sphere } from '@react-three/drei'
import { useState } from "react";
import { TextureLoader, CircleGeometry, MeshBasicMaterial, Mesh } from 'three'; 
import { Circle } from '@react-three/drei';
import * as THREE from 'three'
import { npcPopup } from "../store/npc-store";

export const Scenery = () => {
  const textures = useLoader(TextureLoader, "/assets/3d/Vector.svg");
  const scenery = useLoader(GLTFLoader, "/assets/3d/scene.glb");
  const {  isPopupOpen, setPopupOpen } = npcPopup();
 
  const handleClick = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <group>
      <mesh position={[5.8, 2.1, 6]} scale={0.15} rotation={[0, Math.PI / 2, 0]} 
      onClick={handleClick}>
      <Circle args={[1, 150]}>
        <meshBasicMaterial map={textures}  side={THREE.DoubleSide} />
      </Circle>
      </mesh>
    </group>

      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <primitive object={scenery.scene} />
      </mesh>
  
      {boards.map((board) => {
        const { settings } = board;
        if (settings)
          return (
            <Board
              key={board.id}
              position={settings.position}
              rotation={settings.rotation}
              size={settings.size}
              id={board.id}
            />
          );
      })}

      <SceneryColliders />
      <ObjectsColliders />
    </>
  );
};
