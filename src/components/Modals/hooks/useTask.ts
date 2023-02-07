import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { formErrors } from '../../../constants';

const { REQUIRED, USED } = formErrors;

export type Subtasks = {
  name: string;
  done: boolean;
};

type TaskFormError = {
  title: string;
  subtasks: {
    [key: number]: string;
  };
};

export type Task = {
  id?: string;
  title: string;
  description: string;
  subtasks: Subtasks[] | [];
  subtaskComplete: number;
  status: string;
};

const initialState: Task = {
  title: '',
  description: '',
  subtasks: [{ name: '', done: false }],
  subtaskComplete: 0,
  status: '',
};
export default function useTask(task: Task, isOpen: boolean = false) {
  const [formValues, setFormValues] = useState<Task>(initialState);
  const [errorValues, setErrorValues] = useState<TaskFormError>({
    title: '',
    subtasks: {},
  });

  useEffect(() => {
    setFormValues(() => ({
      ...task,
    }));
    setErrorValues({ title: '', subtasks: {} });
  }, [task?.id]);

  function handleAddSubtasks() {
    setFormValues((prev) => ({
      ...prev,
      subtasks: [...prev.subtasks, { name: '', done: false }],
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
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function onChangeSubtasks(e: ChangeEvent<HTMLInputElement>) {
    const id = e.currentTarget.getAttribute('data-id');
    setFormValues((prev) => {
      try {
        const subtasks = structuredClone(prev.subtasks);
        subtasks[Number(id)].name = e.target.value;

        return {
          ...prev,
          subtasks,
        };
      } catch (e) {
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
    const formError: TaskFormError = {
      title: '',
      subtasks: {},
    };

    if (formValues.title == '') {
      formError.title = REQUIRED;
    }
    formValues.subtasks.forEach((value, index) => {
      if (value.name === '' || value.name == null) {
        formError.subtasks[index] = REQUIRED;
        return;
      }
    });

    if (
      formError.title === '' &&
      Object.keys(formError.subtasks).length === 0
    ) {
      return true;
    }

    setErrorValues(formError);
  }

  return {
    formValues,
    handleAddSubtasks,
    handleDeleteSubtasks,
    onChangeSubtasks,
    onChangeCommon,
    onChangeStatus,
    checkColumnFields,
    errorValues,
  };
}
