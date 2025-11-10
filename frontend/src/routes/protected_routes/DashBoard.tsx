import DashBoardHeader from "../../entities/Task/ui/DashBoardHeader";
import NewTaskModal from "../../features/add_task/ui/NewTaskModal";
import { useTask } from "../../entities/Task/mode/useTask";
import TaskList from "../../entities/Task/ui/TaskList";
import PomodoroTimer from "../../entities/Timer/ui/PomodoroTimer";

export default function DashBoardPage() {
  const { newTaskModalRef, openNewTaskModal } = useTask();

  return (
    <main className="w-full h-full flex flex-col">
      <DashBoardHeader openNewTaskModal={openNewTaskModal} />
      <TaskList />
      <NewTaskModal newTaskModalRef={newTaskModalRef} />
      <PomodoroTimer />
    </main>
  );
}
