// import { useKeyboard, useMouseCapture } from "../hooks";
// import { Player } from "./player";
import { Walls } from "./walls";
import { Scenery } from "./scenery";
import CharacterController2 from "./CharacterController2";
import { CameraControls } from "@react-three/drei";
import {AvatarCreator}  from "@readyplayerme/react-avatar-creator"
import React, {useEffect, useRef, useState, useMemo} from "react"
export const Scene = () => {
  const [avatarMode, setAvatarMode]= useState(true);

  return (
    <>
    {
      // avatarMode && (
      //   <AvatarCreator
      //   subdomain= "demo"
      //   onAvatarExported={(event) => {
      //     console.log(event.data.url)
      //   }}/>
      // )
    }
    <group>
      <Scenery />
      <Walls />
      {/* <Player walk={0.15} jump={1} input={() => getInput(keyboard, mouse)} /> */}
      <CharacterController2/>
    </group>
    </>
  );
};