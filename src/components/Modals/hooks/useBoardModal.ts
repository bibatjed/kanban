import { ChangeEvent, useEffect, useState } from 'react';

import { formErrors } from '../../../constants';

const { REQUIRED, USED } = formErrors;
type BoardFormError = {
  boardName: string;
  columns: {
    [key: number]: string;
  };
};
type Columns = {
  old: string | null;
  new: string;
  itemLength: number;
};

export type BoardFormValues = {
  boardName: string;
  columns: Columns[];
};
export default function useBoardModal(
  board: BoardFormValues,
  boardNames: string[]
) {
  const [formValues, setFormValues] = useState<BoardFormValues>({
    boardName: '',
    columns: [],
  });

  const [errorValues, setErrorValues] = useState<BoardFormError>({
    boardName: '',
    columns: {},
  });
  useEffect(() => {
    setFormValues(board);
    setErrorValues({ boardName: '', columns: {} });
  }, [board.boardName]);

  function handleAddColumn() {
    setFormValues((prev) => {
      const columns = [...prev.columns];
      columns.push({
        old: null,
        new: '',
        itemLength: 0,
      });
      return {
        ...prev,
        columns,
      };
    });
  }

  function handleOnChangeCommon(e: ChangeEvent<HTMLInputElement>) {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  function handleOnChangeArray(e: ChangeEvent<HTMLInputElement>) {
    const id = e.currentTarget.getAttribute('data-id');

    console.log(id);
    setFormValues((prev) => {
      const columns = [...prev.columns];
      columns[Number(id)].new = e.target.value;
      return {
        ...prev,
        columns,
      };
    });
  }

  function handleDeleteColumn(index: number) {
    setFormValues((prev) => {
      const columns = [...prev.columns];
      columns.splice(index, 1);
      return {
        ...prev,
        columns: columns,
      };
    });
  }

  function checkColumnFields() {
    const formError: BoardFormError = {
      boardName: '',
      columns: {},
    };
    if (formValues.boardName == '') {
      formError.boardName = REQUIRED;
    }

    if (boardNames.includes(formValues.boardName.toLowerCase())) {
      formError.boardName = USED;
    }

    formValues.columns.forEach((value, index) => {
      if (value.new === '' || value.new == null) {
        formError.columns[index] = REQUIRED;
        return;
      }

      const findDuplicate = formValues.columns.findIndex(
        (column) => column.new === value.new
      );

      if (findDuplicate >= 0 && findDuplicate !== index) {
        formError.columns[index] = USED;
        return;
      }
    });

    if (
      formError.boardName === '' &&
      Object.keys(formError.columns).length === 0
    ) {
      return true;
    }

    setErrorValues(formError);
  }

  return {
    formValues,
    errorValues,
    handleAddColumn,
    handleOnChangeCommon,
    handleOnChangeArray,
    handleDeleteColumn,
    checkColumnFields,
  };
}
