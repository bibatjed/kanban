import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import IconAddTaskMobile from "../../assets/icons/IconAddTaskMobile";
import IconCross from "../../assets/icons/IconCross";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { closeColumnModal } from "../../reducer/modal";
import Button from "../Button/Button";
import DialogWrapper from "../DialogWrapper";
import Input from "../Input";

export default function ColumnModal() {
  const isOpen = useAppSelector((state) => state.counterReducers.columnModal);
  const dispatch = useAppDispatch();
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
            <Input />
          </div>

          {/* Columns  */}
          <div className="flex flex-col gap-2">
            <span className="font-plus-jakarta-sans text-sm font-light">
              Columns
            </span>
            <div className="flex flex-row items-center gap-4">
              <Input /> <IconCross className="fill-kanban-medium-grey" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-6">
            <Button
              onClick={() => console.log("hello")}
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
