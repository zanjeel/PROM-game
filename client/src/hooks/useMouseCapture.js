// import { useMemo, useEffect } from "react";

// export function useMouseCapture() {
//   let mouseActived = false;
//   const mouse = useMemo(() => ({ x: 0, y: 0 }), []);
//   const mouseMove = (e) => {
//     if (mouseActived) {
//       mouse.x += e.movementX;
//       mouse.y += e.movementY;
//     }
//   };

//   const mouseDown = () => {
//     document.body.style.cursor = "grabbing";
//     mouseActived = true;
//   };

//   const mouseUp = () => {
//     document.body.style.cursor = "auto";
//     mouseActived = false;
//   };

//   useEffect(() => {
//     document.addEventListener("mousemove", mouseMove);
//     document.addEventListener("mousedown", mouseDown);
//     document.addEventListener("mouseup", mouseUp);

//     return () => {
//       document.removeEventListener("mousemove", mouseMove);
//       document.removeEventListener("mousedown", mouseDown);
//       document.removeEventListener("mouseup", mouseUp);
//     };
//   });

//   return mouse;
// }
