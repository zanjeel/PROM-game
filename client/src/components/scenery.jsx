import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { SceneryColliders } from "./colliders/scenery-colliders";
import { ObjectsColliders } from "./colliders/objects-colliders";
import { Board } from "./board";
import boards from "../data/boards-light-data.json";

export const Scenery = () => {
  const scenery = useLoader(GLTFLoader, "/assets/3d/scene.glb");

  return (
    <>
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
