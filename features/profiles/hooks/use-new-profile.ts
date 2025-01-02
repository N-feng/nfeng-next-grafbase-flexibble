import { create } from "zustand";

type NewProfileState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewProfile = create<NewProfileState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
