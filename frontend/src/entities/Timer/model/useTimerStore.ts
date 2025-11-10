import { create } from "zustand";
import type { modalRefScheme } from "../../../shared/ModalWrapper";
import { createRef } from "react";

const initialState = {
  timerModalRef: createRef<modalRefScheme>() as React.RefObject<modalRefScheme>,
  isRunning: false,
};

interface TimerState {
  timerModalRef: React.RefObject<modalRefScheme>;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  ...initialState,
  setIsRunning: (isRunning: boolean) => set({ isRunning }),
}));
