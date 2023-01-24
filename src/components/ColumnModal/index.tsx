import { useState, ChangeEvent, useEffect } from "react";
import IconAddTaskMobile from "../../assets/icons/IconAddTaskMobile";
import IconCross from "../../assets/icons/IconCross";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ContainerState, updateBoard } from "../../reducer/column";
import Button from "../Button/Button";
import DialogWrapper from "../DialogWrapper";
import Input from "../Input";
import { modal } from "../../constants";
import { closeModal as reducerCloseModal } from "../../reducer/modal";
type Columns = {
  old: string | null;
  new: string;
  index: number;
  itemLength: number;
  error?: string;
};
type FormValues = {
  boardName: string;
  columns: Columns[];
};

const { ADD_COLUMN } = modal;

export default function ColumnModal() {
  const modal = useAppSelector((state) => state.modalReducers);
  const isOpen = modal.isOpen && modal.modalType === ADD_COLUMN;
  const container = useAppSelector((state) => state.containerReducers);
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<FormValues>({
    boardName: "Sample",
    columns: [
      ...container.map((value, idx) => {
        return {
          old: value.container,
          new: value.container,
          index: idx,
          itemLength: value.task.length,
        };
      }),
    ],
  });

  useEffect(() => {
    if (modal.isOpen === true && modal.modalType === ADD_COLUMN)
      setFormValues((prev) => {
        return {
          ...prev,
          columns: [
            ...container.map((value, idx) => {
              return {
                old: value.container,
                new: value.container,
                index: idx,
                itemLength: value.task.length,
              };
            }),
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
        index: columns.length - 1,
        itemLength: 0,
      });
      return {
        ...prev,
        columns,
      };
    });
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
    const errorObj: Record<number, string> = {};
    formValues.columns.forEach((value, index) => {
      if (value.new === "" || value.new == null) {
        errorObj[index] = "required";
        return;
      }

      const findDuplicate = formValues.columns.findIndex(
        (column, idx) => column.new === value.new
      );

      if (findDuplicate >= 0 && findDuplicate !== index) {
        errorObj[index] = "used";
        return;
      }
    });

    if (Object.keys(errorObj).length === 0) {
      return true;
    }
    setFormValues((prev) => {
      return {
        ...prev,
        columns: prev.columns.map((value, index) => {
          return {
            ...value,
            error: errorObj[index] || "",
          };
        }),
      };
    });
  }

  function handleSubmit() {
    if (!checkColumnFields()) {
      return;
    }
    const containers: ContainerState[] = [];
    for (let column of formValues.columns) {
      const task = column.old
        ? container.find((item) => item.container === column.old)!.task
        : [];
      containers.push({
        container: column.new,
        task: [...task],
      });
    }
    dispatch(updateBoard(containers));
    closeModal();
  }
  function closeModal() {
    dispatch(reducerCloseModal());
  }

  return (
    <>
      <DialogWrapper
        title="Add New Column"
        isOpen={isOpen}
        onClose={closeModal}
      >
        {/* Dialog Body */}
        <div className="mt-2 flex flex-col gap-4">
          {/* BOARD NAME */}
          <div className="flex flex-col gap-2">
            <span className="font-plus-jakarta-sans text-sm font-light">
              Board Name
            </span>
            <Input isReadOnly={true} />
          </div>

          {/* Columns  */}
          <div className="flex flex-col gap-2">
            <span className="font-plus-jakarta-sans text-sm font-light">
              Columns
            </span>
            {formValues.columns.map((value, index) => {
              const disableDelete = value.itemLength > 0;
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
                      disabled={disableDelete}
                      variant="none"
                    >
                      <IconCross
                        className={`${
                          disableDelete
                            ? "fill-gray-300"
                            : "fill-kanban-medium-grey"
                        }`}
                      />
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
    </>
  );
}
