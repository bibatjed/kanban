import { ChangeEvent, useEffect, useState } from "react";
import uuid from "react-uuid";
import IconAddTaskMobile from "../../assets/icons/IconAddTaskMobile";
import IconCross from "../../assets/icons/IconCross";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addNewTask } from "../../reducer/column";
import { closeModal } from "../../reducer/modal";
import Button from "../Button/Button";
import DialogWrapper from "../DialogWrapper";
import { modal } from "../../constants";
import Input from "../Input";
import Select from "../Select";
import TextArea from "../TextArea";
import { taskCancelled } from "@reduxjs/toolkit/dist/listenerMiddleware/exceptions";

type Subtasks = {
  name: string;
  done: boolean;
  error?: string;
};

type errorObj = {
  title: string;
  subtasks: {
    [key: number]: string;
  };
};

export type Task = {
  id?: string;
  title: string;
  errorTitle?: string;
  description: string;
  subtasks: Subtasks[] | [];
  subtaskComplete: number;
  status: string;
};
const { ADD_TASK } = modal;
export default function TaskModal() {
  const modal = useAppSelector((state) => state.modalReducers);
  const isOpen = modal.isOpen && modal.modalType === ADD_TASK;
  const data = useAppSelector((state) => state.containerReducers);

  const statusList = data.map((value) => value.container);
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<Task>({
    title: "",
    description: "",
    subtasks: [{ name: "", done: false }],
    subtaskComplete: 0,
    status: statusList[0],
  });

  useEffect(() => {
    if (modal.isOpen === true && modal.modalType === ADD_TASK)
      setFormValues((prev) => {
        return {
          ...prev,
          title: "",
          description: "",
          subtasks: [{ name: "", done: false }],
          subtaskComplete: 0,
          status: statusList[0],
        };
      });
  }, [modal.isOpen]);

  function handleAddSubtasks() {
    setFormValues((prev) => ({
      ...prev,
      subtasks: [...prev.subtasks, { name: "", done: false }],
    }));
  }
  function handleDeleteSubtasks(id: number) {
    setFormValues((prev) => {
      const subtasks = [...prev.subtasks];
      subtasks.splice(id, 1);
      return {
        ...prev,
        subtasks: subtasks,
      };
    });
  }
  function onChangeCommon(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const errorTitle = e.target.name === "title" ? "" : formValues.errorTitle;
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      errorTitle,
    }));
  }

  function onChangeSubtasks(e: ChangeEvent<HTMLInputElement>) {
    setFormValues((prev) => {
      const subtasks = [...prev.subtasks];
      subtasks[Number(e.target.name)].name = e.target.value;

      return {
        ...prev,
        subtasks,
      };
    });
  }

  function onChangeStatus(value: string) {
    setFormValues((prev) => ({
      ...prev,
      status: value,
    }));
  }

  function checkColumnFields() {
    const errorObj: errorObj = {
      title: "",
      subtasks: {},
    };

    if (formValues.title == "") {
      errorObj.title = "required";
    }
    formValues.subtasks.forEach((value, index) => {
      if (value.name === "" || value.name == null) {
        errorObj.subtasks[index] = "required";
        return;
      }
    });

    if (errorObj.title === "" && Object.keys(errorObj.subtasks).length === 0) {
      return true;
    }

    setFormValues((prev) => {
      return {
        ...prev,
        errorTitle: errorObj.title as string,
        subtasks: prev.subtasks.map((value, index) => {
          return {
            ...value,
            error: errorObj.subtasks[index] || "",
          };
        }),
      };
    });
  }
  function handleSubmit() {
    if (!checkColumnFields()) {
      return;
    }
    dispatch(addNewTask({ id: uuid(), ...formValues }));
    dispatch(closeModal());
  }

  return (
    <DialogWrapper
      title="Add New Task"
      isOpen={isOpen}
      onClose={() => dispatch(closeModal())}
    >
      {/* Dialog Body */}
      <div className="mt-2 flex flex-col gap-4">
        {/* BOARD NAME */}
        <div className="flex flex-col gap-2">
          <span className="font-plus-jakarta-sans text-sm font-semibold text-kanban-medium-grey">
            Title
          </span>
          <Input
            error={formValues.errorTitle}
            name="title"
            value={formValues.title}
            onChange={onChangeCommon}
            placeholder="e.g. Take coffee break"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-plus-jakarta-sans text-sm font-semibold text-kanban-medium-grey">
            Description
          </span>
          <TextArea
            name="description"
            value={formValues.description}
            onChange={onChangeCommon}
          />
        </div>
        {/* Columns  */}
        <div className="flex flex-col gap-2">
          <span className="font-plus-jakarta-sans text-sm font-semibold text-kanban-medium-grey">
            Subtasks
          </span>
          {formValues.subtasks.map((value, index) => {
            return (
              <div key={index} className="flex flex-row items-center gap-4">
                <Input
                  placeholder="e.g. Make Coffee"
                  name={index.toString()}
                  onChange={onChangeSubtasks}
                  value={value.name}
                  error={value.error}
                />{" "}
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
          <div className="flex relative flex-col gap-2">
            <span className="font-plus-jakarta-sans text-sm font-semibold text-kanban-medium-grey">
              Status
            </span>
            <Select
              name="status"
              onChange={onChangeStatus}
              value={formValues.status}
              list={statusList}
            />
          </div>
          <Button text="Create Task" onClick={handleSubmit} variant="primary" />
        </div>
      </div>
    </DialogWrapper>
  );
}
