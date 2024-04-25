import { RigidBody } from "@react-three/rapier";

const angleToRadians = (angleInDeg) => (Math.PI / 180) * angleInDeg;

export function Walls() {
  return (
    <>
      <RigidBody
        colliders="cuboid"
        lockTranslations={true}
        lockRotations
        position={[0, 0, 0]}
        rotation={[angleToRadians(-90), 0, 0]}
      >
        <mesh receiveShadow>
          <planeGeometry args={[100, 50]} />
          <meshStandardMaterial visible={false} />
        </mesh>
      </RigidBody>

      <pointLight position={[0, 10, 0]} />
    </>
  );
}
