import { useState } from "react";
import { useUiStore } from "../store/ui-store";

export const Board = ({ position, size, rotation, id }) => {
  const [onHover, setOnHover] = useState(false);
  const { setHighlighted, setUiOpened } = useUiStore();

  const handleOnHoverIn = () => {
    setOnHover(true);
  };

  const handleOnHoverOut = () => {
    setOnHover(false);
  };

  const handleClick = () => {
    console.log(id)
    setHighlighted(id);
    setUiOpened(true);
  };

  return (
    <>
      {onHover && (
        <rectAreaLight
          position={position}
          width={size[0]}
          height={size[1]}
          rotation={rotation}
          intensity={2.5}
        />
      )}
      <mesh
        position={position}
        rotation={rotation}
        onPointerEnter={handleOnHoverIn}
        onPointerLeave={handleOnHoverOut}
        onClick={handleClick}
      >
        <planeGeometry args={size} />
        <meshStandardMaterial visible={false} />
      </mesh>
    </>
  );
};
