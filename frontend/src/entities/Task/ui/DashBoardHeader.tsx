import Chips from "../../../shared/Chips";
import Filter from "../../../features/filter/ui/Filter";
import { useFilter } from "../../../features/filter/model/useFilter";
import AddTaskButton from "../../../features/add_task/ui/AddTaskButton";
export default function DashBoardHeader({
  openNewTaskModal,
}: {
  openNewTaskModal: () => void;
}) {
  const {
    selectedPriority,
    selectedStatus,
    priorities,
    statuses,
    selectPriority,
    selectStatus,
    setTitle,
  } = useFilter();

  return (
    <section className="text-2xl font-bold mb-4 text-white p-4 flex justify-center">
      <div className="w-full flex flex-row gap-2 pr-4 items-center justify-center">
        {statuses.map((option, index) => {
          return (
            <Chips
              isActive={selectedStatus === option.toLowerCase()}
              onClick={selectStatus}
              key={`${option}-${index}`}
            >
              {option}
            </Chips>
          );
        })}
      </div>
      <input
        onChange={(e) => setTitle(e.target.value)}
        className="border-[1px] border-[#E5E7EB] rounded-[6px] px-4 py-2 w-full text-[16px]"
        placeholder="Search for task..."
      />
      <div className="w-full pl-4 flex justify-around items-center text-[16px]">
        <Filter
          selectedOption={selectedPriority}
          options={priorities}
          onSelect={selectPriority}
        />
        <AddTaskButton
          onClick={openNewTaskModal}
          className="hover:scale-[1.05]"
        />
      </div>
    </section>
  );
}
