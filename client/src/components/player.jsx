// /* eslint-disable @react-three/no-new-in-loop */
// /* eslint-disable @react-three/no-clone-in-loop */
// import { useFrame, useThree } from "@react-three/fiber";
// import { RigidBody } from "@react-three/rapier";
// import { useRef } from "react";
// import { Vector3 } from "three";
// import { Quaternion } from "three";
// import { clamp, lerp } from "three/src/math/MathUtils";
// import * as THREE from "three";

// export const Player = ({
//   walk = 3,
//   jump = 4,
//   input = () => ({ move: [0, 0, 0], look: [0, 0] }),
// }) => {
//   const character = useRef(null);
//   const mesh = useRef();
//   const { camera } = useThree();

//   let phi = 0;
//   let theta = 0;

//   const speed = new Vector3(walk / 2, jump, walk / 2);
//   const offset = new Vector3(0, 0, 0);
//   const gaze = new Quaternion();
//   const yaw = new Quaternion();
//   const pitch = new Quaternion();
//   const cameraOffset = new Vector3(0, 1, 2);
//   const yAxis = new Vector3(0, 1, 0);
//   const xAxis = new Vector3(1, 0, 0);

//   const updateOrientation = ([x, y]) => {
//     const cameraSpeed = 3;
//     const step = 1;
//     phi = lerp(phi, -x * cameraSpeed, step);
//     theta = lerp(theta, -y * cameraSpeed, step);
//     theta = clamp(theta, -Math.PI / 3, Math.PI / 3);

//     yaw.setFromAxisAngle(yAxis, phi);
//     pitch.setFromAxisAngle(xAxis, theta);
//     gaze.multiplyQuaternions(yaw, pitch).normalize();
//   };

//   useFrame(() => {
//     if (!character.current || !mesh.current) return;
//     const position = character.current.translation();
//     const { move, look, running } = input();

//     updateOrientation(look);

//     offset
//       .fromArray(move)
//       .normalize()
//       .multiply(running ? speed.clone().multiplyScalar(2.5) : speed)
//       .applyQuaternion(yaw);

//     character.current.applyImpulse(offset, true);

//     const newPosition = new THREE.Vector3(position.x, position.y, position.z);
//     camera.position.lerp(
//       newPosition.add(cameraOffset.clone().applyQuaternion(yaw)),
//       .25
//     );

//     camera.quaternion.copy(gaze);
//   });

//   return (
//     <RigidBody
//       ref={character}
//       lockRotations
//       position={[0, 0.1, 0]}
//       friction={0.5}
//       restitution={0.5}
//       colliders="ball"
//     >
//       <mesh ref={mesh} userData={{ tag: "player" }} castShadow>
//         <meshPhysicalMaterial metalness={0.5} roughness={0} />
//         <sphereGeometry args={[0.4, 16, 16]} />
//       </mesh>
//     </RigidBody>
//   );
// };
