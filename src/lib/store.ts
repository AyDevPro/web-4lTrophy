import { create } from "zustand";

type State = {
  scroll: number;
  setScroll: (s: number) => void;
  mouse: { x: number; y: number };
  setMouse: (m: { x: number; y: number }) => void;
};

export const useAppStore = create<State>((set) => ({
  scroll: 0,
  setScroll: (s) => set({ scroll: s }),
  mouse: { x: 0, y: 0 },
  setMouse: (m) => set({ mouse: m }),
}));
