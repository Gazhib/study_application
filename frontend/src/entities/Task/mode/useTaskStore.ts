import { create } from "zustand";
import type { modalRefScheme } from "../../../shared/ModalWrapper";
import { createRef } from "react";
import type { Task } from "../ui/TaskCard";

const initialState = {
  newTaskModalRef:
    createRef<modalRefScheme>() as React.RefObject<modalRefScheme>,
};

interface TaskState {
  newTaskModalRef: React.RefObject<modalRefScheme>;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void
}

export const useTaskStore = create<TaskState>((set) => ({
  ...initialState,
  tasks: [],
  setTasks: (tasks: Task[]) => set({ tasks: tasks }),
  addTask: (task: Task) =>
    set((state) => ({ tasks: [...state.tasks, task] })),
}));
