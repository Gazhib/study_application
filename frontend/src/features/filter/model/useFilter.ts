import { useNavigate, useSearchParams } from "react-router-dom";
import { useFilterStore } from "./filterStore";
import { useRef } from "react";

export const useFilter = () => {
  const priorities = ["low", "normal", "high", "all"];
  const statuses = ["todo", "doing", "done", "archived", "all"];

  const debounceRef = useRef<number | null>(null);

  const [searchParams] = useSearchParams();

  const selectedPriority = searchParams.get("priority") ?? "all";
  const selectedStatus = searchParams.get("status") ?? "all";

  const taskTitle = useFilterStore((state) => state.title);
  const setTaskTitle = useFilterStore((state) => state.setTitle);

  const setTitle = (title: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setTaskTitle(title);
    }, 300);
  };

  const navigate = useNavigate();

  const selectPriority = (newPriority: string) => {
    navigate(`/dashboard?priority=${newPriority}&status=${selectedStatus}`);
  };

  const selectStatus = (newStatus: string) => {
    navigate(`/dashboard?priority=${selectedPriority}&status=${newStatus}`);
  };

  return {
    priorities,
    selectedPriority,
    statuses,
    selectedStatus,
    taskTitle,
    selectPriority,
    selectStatus,
    setTitle,
  };
};
