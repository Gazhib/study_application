import { useTimer } from "../../Timer/model/useTimer";

export interface Task {
  title: string;
  description: string;
  priority: string;
  status: string;
  due_at: string;
  _id: string;
  total_ms: number;
}

export default function TaskCard({ task }: { task: Task }) {
  const { openTimerModal } = useTimer();

  return (
    <article className="w-[250px] border text-white bg-[#111318] rounded-[6px] shadow hover:shadow-lg transition duration-300 cursor-pointer hover:scale-[1.05] transition duration-300 border-[#E5E7EB] flex flex-col ">
      <header className="text-xl px-4 py-2 font-bold bg-[#0B0D11] w-full text-center rounded-t-[6px]">
        {task.title}
      </header>
      <section className="flex flex-col p-4 gap-1">
        <p className="truncate">{task.description}</p>
        <p className="">
          <span className="text-gray-400">Due:</span>{" "}
          {new Date(task.due_at).toLocaleString()}
        </p>
        <p className="">
          <span className="text-gray-400">Status:</span> {task.status}
        </p>
        <p className="">
          <span className="text-gray-400">Priority:</span> {task.priority}
        </p>
        <button
          onClick={() => openTimerModal(task._id)}
          className="w-full rounded-[6px] border-[1px] cursor-pointer px-[10px] py-[5px] bg-[#E11D48]"
        >
          Start Tracking Pomodoro
        </button>
      </section>
    </article>
  );
}
