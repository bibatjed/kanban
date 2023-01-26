import { ChangeEvent, useCallback, useEffect, useState } from "react";

export type Subtasks = {
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
const initialState: Task = {
  title: "",
  description: "",
  subtasks: [{ name: "", done: false }],
  subtaskComplete: 0,
  status: "",
};
export default function useTask(task: Task, isOpen: boolean = false) {
  const [formValues, setFormValues] = useState<Task>(task || initialState);

  console.log(formValues);

  useEffect(() => {
    if (isOpen) {
      setFormValues((prev) => {
        return {
          ...prev,
          ...task,
        };
      });
    }
  }, [task?.id, isOpen]);

  const reset = useCallback(() => {
    setFormValues(task);
  }, [task]);

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
      try {
        const subtasks = structuredClone(prev.subtasks);
        subtasks[Number(e.target.name)].name = e.target.value;

        return {
          ...prev,
          subtasks,
        };
      } catch (e) {
        console.log(e);
        return {
          ...prev,
        };
      }
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

  return {
    formValues,
    handleAddSubtasks,
    handleDeleteSubtasks,
    onChangeSubtasks,
    onChangeCommon,
    onChangeStatus,
    checkColumnFields,
    reset,
  };
}
