import { ChangeEvent, useEffect, useState } from "react";
import { Task } from "./index";
import IconAddTaskMobile from "../../assets/icons/IconAddTaskMobile";
import IconCross from "../../assets/icons/IconCross";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { onEditTask, selectTask } from "../../reducer/column";
import { closeModal } from "../../reducer/modal";
import Button from "../Button/Button";
import DialogWrapper from "../DialogWrapper";
import { modal } from "../../constants";
import Input from "../Input";
import Select from "../Select";
import TextArea from "../TextArea";

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

const { EDIT_TASK } = modal;
export default function EditTaskModal() {
  const modal = useAppSelector((state) => state.modalReducers);
  const isOpen = modal.isOpen && modal.modalType === EDIT_TASK;
  const task = selectTask(modal.modalDetail?.id as string) as Task;
  const data = useAppSelector((state) => state.containerReducers);
  const statusList = data.map((value) => value.container);
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<Task>({
    id: task?.id,
    title: task?.title,
    description: task?.description,
    subtasks: task?.subtasks,
    subtaskComplete: task?.subtaskComplete,
    status: task?.status,
  });

  useEffect(() => {
    if (modal.isOpen === true && modal.modalType === EDIT_TASK)
      setFormValues((prev) => {
        return {
          ...prev,
          id: task?.id,
          title: task?.title,
          description: task?.description,
          subtasks: task?.subtasks,
          subtaskComplete: task?.subtaskComplete,
          status: task?.status,
        };
      });
  }, [modal.isOpen, modal.modalType]);

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
    //@ts-ignore
    const subtaskComplete: number = formValues.subtasks.reduce(
      (acc: number, val: any) => {
        return val.done ? acc + 1 : acc;
      },
      0
    );

    dispatch(onEditTask({ ...formValues, subtaskComplete }));
    dispatch(closeModal());
  }

  return (
    <DialogWrapper
      title="Edit Task"
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
          {formValues.subtasks?.map((value, index) => {
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
          {formValues.subtasks?.length < 7 && (
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
          <Button
            text="Save Changes"
            onClick={handleSubmit}
            variant="primary"
          />
        </div>
      </div>
    </DialogWrapper>
  );
}