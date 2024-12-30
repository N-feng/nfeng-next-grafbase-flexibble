import { create } from "zustand";

type NewProjectState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewProject = create<NewProjectState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
