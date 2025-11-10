import toast from "react-hot-toast";
import { useTimerStore } from "./useTimerStore";
import { port } from "../../../App";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const useTimer = () => {
  const timerModalRef = useTimerStore((state) => state.timerModalRef);

  const isRunning = useTimerStore((state) => state.isRunning);
  const setIsRunning = useTimerStore((state) => state.setIsRunning);

  const [time, setTime] = useState(1500);


  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const activeTaskId = searchParams.get("activeTaskId") || "";

  const openTimerModal = (newActiveTaskId: string) => {
    navigate(`?activeTaskId=${newActiveTaskId}`);
    timerModalRef.current?.openModal();
  };

  const closeTimerModal = () => {
    navigate("");
    timerModalRef.current?.closeModal();
  };

  const startTimer = async () => {
    if (!activeTaskId) {
      toast.error("No active task to start timer for.");
      return;
    }

    const response = await fetch(`${port}/tasks/${activeTaskId}/timer/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const responseData = await response.json();

    if (!response.ok) {
      toast.error(responseData.detail || "Failed to start timer.");
      return;
    }

    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const stopTimer = async () => {
    const response = await fetch(`${port}/tasks/${activeTaskId}/timer/stop`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const responseData = await response.json();
    if (!response.ok) {
      toast.error(responseData.detail || "Failed to stop timer.");
      return;
    }
    setTime(300);
    setIsRunning(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    if (!isRunning) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);


  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return {
    timerModalRef,
    openTimerModal,
    closeTimerModal,
    isRunning,
    startTimer,
    stopTimer,
    pauseTimer,
    activeTaskId,
    time,
    setTime,
    formatTime,
  };
};
