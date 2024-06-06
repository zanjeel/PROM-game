import { create } from "zustand";
import {useGLTF } from '@react-three/drei'
const useAppStore = create((set) => ({
	selectedPoster: null,
	selectPoster: (poster) => set(() => ({ selectedPoster: poster })),
	characterState: "M_Standing_Idle_001",
	setCharacterState: (characterState) =>set({characterState,}),
}));

export default useAppStore;

useGLTF.preload("/animations/M_Walk_001.glb");
useGLTF.preload("/animations/M_Standing_Idle_001.glb");
useGLTF.preload("/animations/M_Dances_001.glb");