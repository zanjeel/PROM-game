import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useState } from "react";

export const ObjectsColliders = () => {
  const [visible, setVisible] = useState(true);
  const colliders01 = useLoader(GLTFLoader, "/assets/3d/colliders01.glb");
  const colliders02 = useLoader(GLTFLoader, "/assets/3d/colliders02.glb");
  const colliders03 = useLoader(GLTFLoader, "/assets/3d/colliders03.glb");
  const colliders04 = useLoader(GLTFLoader, "/assets/3d/colliders04.glb");
  const colliders05 = useLoader(GLTFLoader, "/assets/3d/colliders05.glb");
  const colliders06 = useLoader(GLTFLoader, "/assets/3d/colliders06.glb");
  const stairs = useLoader(GLTFLoader, "/assets/3d/stairs.glb");

  const colliders = [
    colliders01,
    colliders02,
    colliders03,
    colliders04,
    colliders05,
    colliders06,

  ];

  useEffect(() => {
    setVisible(false);
  }, [colliders.length]);

  return (
    <>
      {colliders.map((col, idx) => (
        <RigidBody type="fixed" key={idx.toString()} >
          <mesh visible={visible}>
            <primitive object={col.scene} />
          </mesh>
        </RigidBody>
      ))}
    </>
  );
};
