import { useEffect, useState } from "react";
import type { Task } from "../ui/TaskCard";
import { port } from "../../../App";
import { useTaskStore } from "./useTaskStore";
import { useQuery } from "@tanstack/react-query";
import { useFilter } from "../../../features/filter/model/useFilter";
import toast from "react-hot-toast";

export const useTask = () => {
  const newTaskModalRef = useTaskStore((state) => state.newTaskModalRef);

  const { selectedPriority, selectedStatus, taskTitle } = useFilter();

  const { data, isLoading: areTasksLoading } = useQuery({
    queryKey: ["dashboardData", selectedPriority, selectedStatus, taskTitle],
    queryFn: async () => {
      console.log(taskTitle);
      const response = await fetch(
        `${port}/tasks?title=${taskTitle.toLowerCase()}&priority=${selectedPriority.toLowerCase()}&status=${selectedStatus.toLowerCase()}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        return [];
      }
      const tasks = await response.json();
      return tasks;
    },
    staleTime: 5 * 60 * 1000,
  });

  const tasks = useTaskStore((state) => state.tasks);
  const setTasks = useTaskStore((state) => state.setTasks);
  const addTaskToStore = useTaskStore((state) => state.addTask);

  useEffect(() => {
    if (!areTasksLoading && data) {
      setTasks(data);
    }
  }, [data]);

  const [newTask, setNewTask] = useState<Task>({
    _id: "",
    title: "",
    description: "",
    status: "todo",
    priority: "normal",
    due_at: new Date().toISOString().split("T")[0],
    total_ms: 0,
  });

  const [error, setError] = useState<string | null>(null);

  const openNewTaskModal = () => {
    newTaskModalRef.current?.openModal();
  };

  const closeNewTaskModal = () => {
    newTaskModalRef.current?.closeModal();
  };

  const changeStatus = (status: string) => {
    setNewTask((prev) => ({ ...prev, status }));
  };

  const changePriority = (priority: string) => {
    setNewTask((prev) => ({ ...prev, priority }));
  };

  const changeTitle = (title: string) => {
    setNewTask((prev) => ({ ...prev, title }));
  };

  const changeDescription = (description: string) => {
    setNewTask((prev) => ({ ...prev, description }));
  };

  const changeDueDate = (due_at: string) => {
    setNewTask((prev) => ({ ...prev, due_at }));
  };

  const addTask = async () => {
    const response = await fetch(`${port}/tasks`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    const responseData = await response.json();
    if (!response.ok) {
      if (typeof responseData.detail === "string") {
        setError(responseData.detail);
      } else {
        setError("Failed to add task");
      }
      return;
    }

    setNewTask({
      _id: "",
      title: "",
      description: "",
      status: "todo",
      priority: "normal",
      due_at: new Date().toLocaleDateString(),
      total_ms: 0,
    });
    addTaskToStore(responseData);
    toast.success("Task added successfully");
    closeNewTaskModal();
  };

  return {
    newTaskModalRef,
    openNewTaskModal,
    closeNewTaskModal,
    newTask,
    changeStatus,
    changePriority,
    changeTitle,
    changeDescription,
    changeDueDate,
    addTask,
    tasks,
    areTasksLoading,
    error,
  };
};
