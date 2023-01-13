import { useState, ChangeEvent } from "react";
import IconAddTaskMobile from "../../assets/icons/IconAddTaskMobile";
import IconCross from "../../assets/icons/IconCross";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { closeColumnModal } from "../../reducer/modal";
import Button from "../Button/Button";
import DialogWrapper from "../DialogWrapper";
import Input from "../Input";

type FormValues = {
  boardName: string;
  columns: string[];
};

export default function ColumnModal() {
  const isOpen = useAppSelector((state) => state.counterReducers.columnModal);
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<FormValues>({
    boardName: "Sample",
    columns: ["hello", "sample", "sample2"],
  });
  function handleAddColumn() {
    setFormValues((prev) => {
      const columns = [...prev.columns];
      columns.push("");
      console.log(columns);
      return {
        ...prev,
        columns,
      };
    });
  }

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setFormValues((prev) => {
      const columns = [...prev.columns];
      columns[Number(e.target.name)] = e.target.value;
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
                    value={value}
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
              onClick={() => console.log("hello")}
              text="Create New Board"
              variant="primary"
            />
          </div>
        </div>
      </DialogWrapper>
    </>
  );
}
