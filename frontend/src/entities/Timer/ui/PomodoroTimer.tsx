import { useQuery } from "@tanstack/react-query";
import { Modal } from "../../../shared/ModalWrapper";
import { useTimer } from "../model/useTimer";
import TimerControls from "./TimerControls";
import TimerDisplay from "./TimerDisplay";
import { port } from "../../../App";
import toast from "react-hot-toast";
import type { Task } from "../../Task/ui/TaskCard";

export default function PomodoroTimer() {
  const {
    timerModalRef,
    isRunning,
    startTimer,
    pauseTimer,
    stopTimer,
    closeTimerModal,
    activeTaskId,
    time,
    formatTime,
  } = useTimer();

  const { data: task, isLoading } = useQuery({
    queryKey: ["current-timer-session", activeTaskId],
    queryFn: async (): Promise<Task | null> => {
      if (!activeTaskId) return null;
      const response = await fetch(`${port}/tasks/${activeTaskId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const responseData = await response.json();
      if (!response.ok) {
        toast.error(responseData.detail || "Failed to fetch current task.");
        return null;
      }
      return responseData;
    },
    staleTime: Infinity,
  });

  return (
    <Modal ref={timerModalRef} height="100%" width="100%">
      <main className="text-white min-h-screen w-full flex flex-col gap-[30px] bg-[#111318] justify-center items-center">
        <section>
          <span className="text-[32px]">{!isLoading && task?.title}</span>
        </section>

        <section className="flex w-full justify-end p-4 absolute top-0 right-0">
          <button
            type="button"
            onClick={closeTimerModal}
            className="cursor-pointer"
          >
            x
          </button>
        </section>
        <TimerDisplay time={time} formatTime={formatTime} />
        <TimerControls
          isActive={isRunning}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          stopTimer={stopTimer}
        />
      </main>
    </Modal>
  );
}
