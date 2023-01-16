import { useState, ChangeEvent, useEffect } from "react";
import IconAddTaskMobile from "../../assets/icons/IconAddTaskMobile";
import IconCross from "../../assets/icons/IconCross";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ContainerState, updateBoard } from "../../reducer/column";
import { closeColumnModal } from "../../reducer/modal";
import Button from "../Button/Button";
import DialogWrapper from "../DialogWrapper";
import Input from "../Input";

type Columns = {
  old: string | null;
  new: string;
  index: number;
};
type FormValues = {
  boardName: string;
  columns: Columns[];
};

export default function ColumnModal() {
  const isOpen = useAppSelector((state) => state.counterReducers.columnModal);
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
        };
      }),
    ],
  });

  useEffect(() => {
    setFormValues((prev) => {
      return {
        ...prev,
        columns: [
          ...container.map((value, idx) => {
            return {
              old: value.container,
              new: value.container,
              index: idx,
            };
          }),
        ],
      };
    });
  }, [isOpen]);

  function handleAddColumn() {
    setFormValues((prev) => {
      const columns = [...prev.columns];
      columns.push({
        old: null,
        new: "",
        index: columns.length - 1,
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
    console.log(index);
    setFormValues((prev) => {
      const columns = [...prev.columns];
      columns.splice(index, 1);
      console.log(columns);
      return {
        ...prev,
        columns: columns,
      };
    });
  }

  function handleSubmit() {
    const containers: ContainerState[] = [];
    for (let column of formValues.columns) {
      containers.push({
        container: column.new,
        task: [...(container[column.index]?.task || [])],
      });
    }
    dispatch(updateBoard(containers));
    closeModal();
  }
  function closeModal() {
    dispatch(closeColumnModal());
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
              return (
                <div key={index} className="flex flex-row items-center gap-4">
                  <Input
                    name={index.toString()}
                    onChange={handleOnChange}
                    value={value.new}
                  />{" "}
                  <button
                    onClick={() => {
                      handleDeleteColumn(index);
                    }}
                  >
                    <IconCross className="fill-kanban-medium-grey" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-6">
            <Button
              onClick={handleAddColumn}
              text="Add New Column"
              variant="secondary"
            >
              <IconAddTaskMobile className="fill-kanban-main-purple" />
            </Button>
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
