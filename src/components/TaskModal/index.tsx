import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { closeTaskModal, openTaskModal } from "../../reducer/modal";
import DialogWrapper from "../DialogWrapper";

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
      <span>Title</span>
      <input name="title" value={formValues.title} onChange={onChangeCommon} />
      <span>Title</span>
      <input
        name="description"
        value={formValues.description}
        onChange={onChangeCommon}
      />
      {formValues.subtasks.map((value, idx) => {
        return (
          <div key={idx}>
            {" "}
            <input
              onChange={(e) => onChangeSubtasks(e.target.value, idx)}
              key={idx}
              value={value.name}
            />
            <button onClick={() => handleDeleteSubtasks(idx)}>x</button>
          </div>
        );
      })}
      <button onClick={handleAddSubtasks}>Add New Tasks</button>
      <input
        name="status"
        value={formValues.status}
        onChange={onChangeCommon}
      />{" "}
      status
      <button onClick={() => console.log("hello")}>submit</button>
    </DialogWrapper>
  );
}
