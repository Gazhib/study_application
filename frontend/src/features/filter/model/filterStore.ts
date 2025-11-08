import { create } from "zustand";

interface FilterState {
  title: string;
  setTitle: (newTitle: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  title: "",
  setTitle: (newTitle: string) => set({ title: newTitle }),
}));
