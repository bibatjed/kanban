import DialogWrapper from "../DialogWrapper";
import { closeModal } from "../../reducer/modal";
import { modal } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Button from "../Button/Button";

const { DELETE_TASK } = modal;
export default function DeleteTaskModal() {
  const modal = useAppSelector((state) => state.modalReducers);
  const isOpen = modal.isOpen && modal.modalType === DELETE_TASK;
  const dispatch = useAppDispatch();
  return (
    <DialogWrapper
      isOpen={isOpen}
      title="Delete this task?"
      titleColor="red"
      onClose={() => dispatch(closeModal())}
    >
      <div className="mt-4 flex flex-col gap-7">
        <p className="text-[13px] font-medium font-plus-jakarta-sans text-kanban-medium-grey">
          Are you sure you wnt to delete the 'Build settings UI' task and its
          subtasks? This action cannot be reversed.
        </p>
        <div className="flex flex-row gap-3 h-10">
          <div className="basis-1/2">
            <Button text="Delete" variant="tertiary" />
          </div>
          <div className="basis-1/2">
            <Button text="Cancel" variant="secondary" />
          </div>
        </div>
      </div>
    </DialogWrapper>
  );
}
