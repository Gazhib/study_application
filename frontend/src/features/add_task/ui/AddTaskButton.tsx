export default function AddTaskButton({
  onClick,
  className,
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer transition duration-300 bg-[#E11D48] text-white font-semibold px-4 py-2 rounded-[6px] ${className}`}
    >
      Add Task
    </button>
  );
}
