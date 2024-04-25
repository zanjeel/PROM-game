import { create } from "zustand";

export const useUiStore = create((set) => ({
  isUiOpen: false,
  setUiOpened: (value) => set(() => ({ isUiOpen: value })),
  highlighted: null,
  setHighlighted: (value) => set(() => ({ highlighted: value })),
}));
