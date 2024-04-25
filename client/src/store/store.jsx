import { create } from "zustand";

const useAppStore = create((set) => ({
	selectedPoster: null,
	selectPoster: (poster) => set(() => ({ selectedPoster: poster })),
	characterState: "idle",
	setCharacterState: (characterState) =>
		set({
			characterState,
		}),
}));

export default useAppStore;
