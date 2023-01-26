import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { modal } from "../../constants";
import { closeModal } from "../../reducer/modal";
import DialogWrapper from "../DialogWrapper";
import Button from "../Button/Button";
import { onDeleteBoard } from "../../reducer/board";
import { addDetails } from "../../reducer/boardDetails";
const { DELETE_BOARD } = modal;
export default function DeleteBoardModal() {
  const modal = useAppSelector((state) => state.modalReducers);
  const isOpen = modal.isOpen && modal.modalType === DELETE_BOARD;
  const board = useAppSelector((state) => state.containerReducers);
  const boardDetails = useAppSelector((state) => state.boardDetailsReducers);
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(
      onDeleteBoard({ type: "", boardIndex: boardDetails.boardSelectedIndex })
    );
    dispatch(addDetails({ type: "", boardSelectedIndex: 0 }));
    dispatch(closeModal());
  }

  function handleCancel() {
    dispatch(closeModal());
  }
  return (
    <DialogWrapper
      isOpen={isOpen}
      title="Delete this board?"
      titleColor="red"
      onClose={() => dispatch(closeModal())}
    >
      <div className="mt-4 flex flex-col gap-7">
        <p className="text-[13px] font-medium tracking-wider font-plus-jakarta-sans text-kanban-medium-grey">
          Are you sure you want to delete '
          {board[boardDetails.boardSelectedIndex]?.name ?? ""}' board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="flex flex-row gap-3 h-10">
          <div className="basis-1/2">
            <Button text="Delete" variant="tertiary" onClick={handleDelete} />
          </div>
          <div className="basis-1/2">
            <Button onClick={handleCancel} text="Cancel" variant="secondary" />
          </div>
        </div>
      </div>
    </DialogWrapper>
  );
}
