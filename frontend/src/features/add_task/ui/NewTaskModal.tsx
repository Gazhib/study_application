import { Form } from "react-router-dom";
import { Modal, type modalRefScheme } from "../../../shared/ModalWrapper";
import { useFilter } from "../../filter/model/useFilter";
import Chips from "../../../shared/Chips";
import { useTask } from "../../../entities/Task/mode/useTask";
import Filter from "../../filter/ui/Filter";
import AddTaskButton from "./AddTaskButton";

export default function NewTaskModal({
  newTaskModalRef,
}: {
  newTaskModalRef: React.RefObject<modalRefScheme | null>;
}) {
  const { statuses, priorities } = useFilter();

  const {
    newTask,
    changeDescription,
    changeDueDate,
    changePriority,
    changeStatus,
    changeTitle,
    closeNewTaskModal,
    addTask,
    error,
  } = useTask();

  return (
    <Modal ref={newTaskModalRef} height="100vh" width="500px">
      <Form className="flex flex-col gap-4 p-4 bg-[#111318] text-white border-[1px] border-[#1F2430] w-full min-h-screen">
        <section className="text-white border-b-[1px] border-[#1F2430] pb-4 flex flex-row justify-between">
          <h2 className="">New Task</h2>
          <button type="button" onClick={closeNewTaskModal} className="cursor-pointer ">
            x
          </button>
        </section>
        <section className="text-[#E5E7EB] flex flex-col gap-4">
          <label>Title</label>
          <input
            className="bg-[#0F1218] border-[1px] border-[#1F2430] px-4 py-2 rounded-[6px]"
            type="text"
            name="title"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => changeTitle(e.target.value)}
            required
          />
          <label>Description</label>
          <textarea
            className="bg-[#0F1218] border-[1px] border-[#1F2430] px-4 py-2 rounded-[6px]"
            name="description"
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => changeDescription(e.target.value)}
            required
          />
          <label>Due Date</label>
          <input
            onChange={(e) => changeDueDate(e.target.value)}
            value={newTask.due_at}
            type="date"
          />
          <label>Status</label>
          <div className="flex flex-row gap-2">
            {statuses
              .filter((option) => option !== "all")
              .map((option, index) => {
                return (
                  <Chips
                    isActive={newTask.status === option.toLowerCase()}
                    key={`${option}-${index}`}
                    onClick={changeStatus}
                  >
                    {option}
                  </Chips>
                );
              })}
          </div>
          <label>Priority</label>
          <Filter
            options={priorities.filter((option) => option !== "all")}
            selectedOption={newTask.priority}
            onSelect={changePriority}
          />
        </section>
        <section className="flex justify-between items-center mt-4">
          <span className="text-[#FCA5A5]">{error}</span>
          <AddTaskButton onClick={addTask} className="hover:bg-[#BE123C]" />
        </section>
      </Form>
    </Modal>
  );
}
