import DialogWrapper from "../DialogWrapper";
import { closeModal } from "../../reducer/modal";
import { modal } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const { DELETE_TASK } = modal;
export default function DeleteTaskModal() {
  const modal = useAppSelector((state) => state.modalReducers);
  const isOpen = modal.isOpen && modal.modalType === DELETE_TASK;
  const dispatch = useAppDispatch();
  return (
    <DialogWrapper
      isOpen={isOpen}
      title="Delete"
      onClose={() => dispatch(closeModal())}
    >
      bitchasss
    </DialogWrapper>
  );
}
