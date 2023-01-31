import { useState, ChangeEvent, useEffect } from "react";
import IconAddTaskMobile from "../../assets/icons/IconAddTaskMobile";
import IconCross from "../../assets/icons/IconCross";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  ContainerState,
  onAddNewBoard,
  updateBoard,
} from "../../reducer/board";
import Button from "../Button/Button";
import DialogWrapper from "../DialogWrapper";
import Input from "../Input";
import { modal } from "../../constants";
import { closeModal as reducerCloseModal } from "../../reducer/modal";
import { addDetails } from "../../reducer/boardDetails";

type errorObj = {
  boardName: string;
  columns: {
    [key: number]: string;
  };
};
type Columns = {
  old: string | null;
  new: string;
  error?: string;
};
export type BoardFormValues = {
  boardName: string;
  boardNameError?: string;
  columns: Columns[];
};

const { CREATE_BOARD } = modal;

export default function CreateBoardModal() {
  const modal = useAppSelector((state) => state.modalReducers);
  const isOpen = modal.isOpen && modal.modalType === CREATE_BOARD;
  const boardDetails = useAppSelector((state) => state.boardDetailsReducers);
  const state = useAppSelector((state) => state.containerReducers);
  const container = state[boardDetails.boardSelectedIndex]?.columns ?? [];
  const boardNames = state.map((item) => item.name.toLowerCase());
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<BoardFormValues>({
    boardName: "",
    columns: [],
  });

  useEffect(() => {
    if (modal.isOpen === true && modal.modalType === CREATE_BOARD)
      setFormValues((_) => {
        return {
          boardName: "",
          columns: [
            {
              old: null,
              new: "",
            },
          ],
        };
      });
  }, [modal.isOpen]);

  function handleAddColumn() {
    setFormValues((prev) => {
      const columns = [...prev.columns];
      columns.push({
        old: null,
        new: "",
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
  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setFormValues((prev) => {
      const columns = [...prev.columns];
      columns[Number(e.target.name)].new = e.target.value;
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
    const errorObj: errorObj = {
      boardName: "",
      columns: {},
    };

    if (formValues.boardName == "") {
      errorObj.boardName = "required";
    }

    if (boardNames.includes(formValues.boardName.toLowerCase())) {
      errorObj.boardName = "used";
    }

    formValues.columns.forEach((value, index) => {
      if (value.new === "" || value.new == null) {
        errorObj.columns[index] = "required";
        return;
      }

      const findDuplicate = formValues.columns.findIndex(
        (column, idx) => column.new === value.new
      );

      if (findDuplicate >= 0 && findDuplicate !== index) {
        errorObj.columns[index] = "used";
        return;
      }
    });

    if (
      errorObj.boardName === "" &&
      Object.keys(errorObj.columns).length === 0
    ) {
      return true;
    }

    setFormValues((prev) => {
      return {
        ...prev,
        boardNameError: errorObj.boardName,

        columns: prev.columns.map((value, index) => {
          return {
            ...value,
            error: errorObj.columns[index] || "",
          };
        }),
      };
    });
  }

  function handleSubmit() {
    if (!checkColumnFields()) {
      return;
    }

    dispatch(onAddNewBoard(formValues));
    dispatch(addDetails({ type: "", boardSelectedIndex: boardNames.length }));
    closeModal();
  }
  function closeModal() {
    dispatch(reducerCloseModal());
  }

  return (
    <DialogWrapper title="Add New Board" isOpen={isOpen} onClose={closeModal}>
      {/* Dialog Body */}
      <div className="mt-2 flex flex-col gap-4">
        {/* BOARD NAME */}
        <div className="flex flex-col gap-2">
          <span className="font-plus-jakarta-sans text-sm text-kanban-medium-grey font-semibold">
            Board Name
          </span>
          <Input
            error={formValues.boardNameError}
            name="boardName"
            onChange={handleOnChangeCommon}
            value={formValues.boardName}
          />
        </div>

        {/* Columns  */}
        <div className="flex flex-col gap-2">
          <span className="font-plus-jakarta-sans text-sm font-semibold text-kanban-medium-grey">
            Columns
          </span>
          {formValues.columns.map((value, index) => {
            return (
              <div key={index} className="flex flex-row items-center gap-4">
                <Input
                  error={value.error}
                  name={index.toString()}
                  onChange={handleOnChange}
                  value={value.new}
                />{" "}
                <div>
                  <Button
                    onClick={() => {
                      handleDeleteColumn(index);
                    }}
                    text=""
                    variant="none"
                  >
                    <IconCross className={`${"fill-kanban-medium-grey"}`} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-6">
          {formValues.columns.length < 6 && (
            <Button
              onClick={handleAddColumn}
              text="Add New Column"
              variant="secondary"
            >
              <IconAddTaskMobile className="fill-kanban-main-purple" />
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            text="Create New Board"
            variant="primary"
          />
        </div>
      </div>
    </DialogWrapper>
  );
}
