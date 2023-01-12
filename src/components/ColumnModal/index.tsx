import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import IconAddTaskMobile from "../../assets/icons/IconAddTaskMobile";
import IconCross from "../../assets/icons/IconCross";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { closeColumnModal } from "../../reducer/modal";
import Button from "../Button/Button";
import Input from "../Input";

export default function ColumnModal() {
  const isOpen = useAppSelector((state) => state.counterReducers.columnModal);
  const dispatch = useAppDispatch();
  function closeModal() {
    dispatch(closeColumnModal());
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-7 text-left align-middle shadow-xl transition-all">
                  {/* Dialog Header */}
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-plus-jakarta-sans font-semibold text-kanban-black"
                  >
                    Add New Column
                  </Dialog.Title>
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
                        <Input />{" "}
                        <IconCross className="fill-kanban-medium-grey" />
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
