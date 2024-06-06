import { create } from "zustand";

export const npcPopup = create((set) => ({
  isPopupOpen: false,
  setPopupOpen: (value) => set(() => ({   isPopupOpen: value })),
}));
