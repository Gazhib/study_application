import TaskCard, { type Task } from "./TaskCard";
import { useTask } from "../mode/useTask";
import TaskCardSkeleton from "./TaskCardSkeleton";
import AddTaskButton from "../../../features/add_task/ui/AddTaskButton";

export default function TaskList() {
  const { tasks, areTasksLoading, openNewTaskModal } = useTask();

  return (
    <section className="flex flex-row flex-wrap gap-4 p-4 justify-center h-full w-full">
      {areTasksLoading
        ? Array.from({ length: 6 }).map((_, i) => {
            return <TaskCardSkeleton key={i} />;
          })
        : tasks?.map((task: Task, i: number) => {
            return <TaskCard key={`${task._id}-${i}`} task={task} />;
          })}
      {!areTasksLoading && tasks.length === 0 && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-white text-xl">No tasks found.</p>
          <AddTaskButton onClick={openNewTaskModal} className="scale-[1.05]"/>
        </div>
      )}
    </section>
  );
}
