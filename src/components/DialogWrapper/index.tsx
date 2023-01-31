import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

type DialogWrapperProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode | ReactNode[];
  titleColor?: string;
};

interface IDialogWrapper extends DialogWrapperProps {
  onClose: () => void;
}
export default function DialogWrapper(props: IDialogWrapper) {
  const { titleColor = "black" } = props;
  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.onClose}>
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
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl dark:bg-kanban-dark-grey bg-white p-7 text-left align-middle shadow-xl transition-all">
                  {/* Dialog Header */}
                  <Dialog.Title
                    as="h3"
                    className={`text-lg font-plus-jakarta-sans font-semibold ${
                      titleColor === "black"
                        ? "text-kanban-black dark:text-kanban-white"
                        : "text-kanban-red"
                    }`}
                  >
                    {props.title}
                  </Dialog.Title>
                  {props.children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
