import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconAddTaskMobile from "../../assets/icons/IconAddTaskMobile";
import IconCross from "../../assets/icons/IconCross";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { closeTaskModal, openTaskModal } from "../../reducer/modal";
import Button from "../Button/Button";
import DialogWrapper from "../DialogWrapper";
import Input from "../Input";
import TextArea from "../TextArea";

interface ITaskModal {
  submit: (e: Task) => void;
}

type Subtasks = {
  name: string;
  done: boolean;
};

export type Task = {
  id?: string;
  title: string;
  description: string;
  subtasks: Subtasks[];
  status: string;
};
export default function TaskModal() {
  const isOpen = useAppSelector((state) => state.counterReducers.taskModal);
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<Task>({
    title: "",
    description: "",
    subtasks: [{ name: "", done: false }],
    status: "",
  });

  function handleAddSubtasks() {
    setFormValues((prev) => ({
      ...prev,
      subtasks: [...prev.subtasks, { name: "", done: false }],
    }));
  }
  function handleDeleteSubtasks(id: number) {
    setFormValues((prev) => ({
      ...prev,
      subtasks: prev.subtasks.slice(id, id + 1),
    }));
  }
  function onChangeCommon(e: ChangeEvent<HTMLInputElement>) {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function onChangeSubtasks(value: string, id: number) {
    setFormValues((prev) => {
      const subtasks = [...prev.subtasks];
      subtasks[id].name = value;

      return {
        ...prev,
        subtasks,
      };
    });
  }
  return (
    <DialogWrapper
      title="Add New Task"
      isOpen={isOpen}
      onClose={() => dispatch(closeTaskModal())}
    >
      {/* Dialog Body */}
      <div className="mt-2 flex flex-col gap-4">
        {/* BOARD NAME */}
        <div className="flex flex-col gap-2">
          <span className="font-plus-jakarta-sans text-sm font-semibold text-kanban-medium-grey">
            Title
          </span>
          <Input placeholder="e.g. Take coffee break" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-plus-jakarta-sans text-sm font-semibold text-kanban-medium-grey">
            Description
          </span>
          <TextArea />
        </div>
        {/* Columns  */}
        <div className="flex flex-col gap-2">
          <span className="font-plus-jakarta-sans text-sm font-semibold text-kanban-medium-grey">
            Subtasks
          </span>
          {formValues.subtasks.map((value, index) => {
            return (
              <div key={index} className="flex flex-row items-center gap-4">
                <Input name={index.toString()} value={value.name} />{" "}
                <div>
                  <Button
                    onClick={() => handleDeleteSubtasks(index)}
                    text=""
                    variant="none"
                  >
                    <IconCross className="fill-kanban-medium-grey" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-6">
          {formValues.subtasks.length < 7 && (
            <Button
              text="Add New Subtasks"
              onClick={handleAddSubtasks}
              variant="secondary"
            >
              <IconAddTaskMobile className="fill-kanban-main-purple" />
            </Button>
          )}
          <Button text="Create Task" variant="primary" />
        </div>
      </div>
    </DialogWrapper>
  );
}
