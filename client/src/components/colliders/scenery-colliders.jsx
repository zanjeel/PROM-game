import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export const SceneryColliders = () => {
  return (
    <>
      <RigidBody
        name="stair-rail-left"
        type="fixed"
        position={[3.6, 2.2, -2.6]}
        scale={[0.33, 0.92, 5.4]}
        rotation={[0.75, 0, 0]}
      >
        <Box>
          <meshStandardMaterial visible={false} />
        </Box>
      </RigidBody>
      <RigidBody
        name="stair-rail-right"
        type="fixed"
        position={[5.23, 2.2, -2.6]}
        scale={[0.33, 0.92, 5.4]}
        rotation={[0.75, 0, 0]}
      >
        <Box>
          <meshStandardMaterial visible={false} />
        </Box>
      </RigidBody>
      <RigidBody
        name="stair-bottom"
        type="fixed"
        position={[4.44, 1.4, -2.2]}
        scale={[1.4, 0.3, 6.4]}
        rotation={[0.76, 0, 0]}
        friction={0}
      >
        <Box>
          <meshStandardMaterial visible={false} />
        </Box>
      </RigidBody>
      <RigidBody
        name="rails-left-0"
        type="fixed"
        position={[0.13, 4.04, -4.58]}
        scale={[6.9, 1.1, 0.1]}
        rotation={[0, 0, 0]}
      >
        <Box>
          <meshStandardMaterial visible={false} />
        </Box>
      </RigidBody>
      <RigidBody
        name="rails-left-1"
        type="fixed"
        position={[-3.31, 4.04, 0.45]}
        scale={[10, 1.1, 0.1]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <Box>
          <meshStandardMaterial visible={false} />
        </Box>
      </RigidBody>
      <RigidBody
        name="rails-left-2"
        type="fixed"
        position={[1.62, 4.07, 5.44]}
        scale={[9.8, 1.1, 0.01]}
        rotation={[0, 0, 0]}
      >
        <Box>
          <meshStandardMaterial visible={false} />
        </Box>
      </RigidBody>
      <RigidBody
        name="rails-left-3"
        type="fixed"
        position={[6.51, 4.04, 0.45]}
        scale={[10, 1.1, 0.1]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <Box>
          <meshStandardMaterial visible={false} />
        </Box>
      </RigidBody>
      <RigidBody
        name="rails-left-4"
        type="fixed"
        position={[5.85, 4.04, -4.58]}
        scale={[1.5, 1.1, 0.1]}
        rotation={[0, 0, 0]}
      >
        <Box>
          <meshStandardMaterial visible={false} />
        </Box>
      </RigidBody>
      <RigidBody
        name="mezzanine-left"
        type="fixed"
        position={[-4.62, 3.6, 0.59]}
        scale={[3, 0.2, 13]}
        rotation={[0, 0, 0]}
      >
        <Box>
          <meshStandardMaterial visible={false} />
        </Box>
      </RigidBody>
      <RigidBody
        name="mezzanine-right"
        type="fixed"
        position={[7.82, 3.6, 0.59]}
        scale={[3, 0.2, 13]}
        rotation={[0, 0, 0]}
      >
        <Box>
          <meshStandardMaterial visible={false} />
        </Box>
      </RigidBody>
      <RigidBody
        name="mezzanine-behind"
        type="fixed"
        position={[2.11, 3.6, 6.75]}
        scale={[3, 0.2, 15]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <Box>
          <meshStandardMaterial visible={false} />
        </Box>
      </RigidBody>
      <RigidBody
        name="mezzanine-front"
        type="fixed"
        position={[2.11, 3.6, -5.88]}
        scale={[3, 0.2, 15]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <Box>
          <meshStandardMaterial visible={false} />
        </Box>
      </RigidBody>
      <RigidBody
        name="wall-behind"
        type="fixed"
        position={[1.68, 4.82, 7.38]}
        scale={[14.3, 10.02, 0.3]}
        rotation={[0, 0, 0]}
      >
        <Box>
          <meshStandardMaterial visible={false} />
        </Box>
      </RigidBody>
      <RigidBody
        name="wall-front-downstairs"
        type="fixed"
        position={[1.69, 1.93, -7.15]}
        scale={[14, 4, 0.3]}
        rotation={[0, 0, 0]}
      >
        <Box>
          <meshStandardMaterial visible={false} />
        </Box>
      </RigidBody>
      <RigidBody
        name="wall-front-upstairs"
        type="fixed"
        position={[1.7, 6.07, -6.27]}
        scale={[14, 4, 0.3]}
        rotation={[0, 0, 0]}
      >
        <Box>
          <meshStandardMaterial visible={false} />
        </Box>
      </RigidBody>
      <RigidBody
        name="wall-left"
        type="fixed"
        position={[-5.67, 4.8, 1.14]}
        scale={[0.3, 10, 14]}
        rotation={[0, 0, 0]}
      >
        <Box>
          <meshStandardMaterial visible={false} />
        </Box>
      </RigidBody>
      <RigidBody
        name="wall-right"
        type="fixed"
        position={[8.42, 4.8, 1.1]}
        scale={[0.3, 10, 14]}
        rotation={[0, 0, 0]}
      >
        <Box>
          <meshStandardMaterial visible={false} />
        </Box>
      </RigidBody>
      <RigidBody
        name="ceiling"
        type="fixed"
        position={[1.65, 7.24, 0]}
        scale={[15, 0.15, 15]}
        rotation={[0, 0, 0]}
      >
        <Box>
          <meshStandardMaterial visible={false} />
        </Box>
      </RigidBody>
    </>
  );
};
