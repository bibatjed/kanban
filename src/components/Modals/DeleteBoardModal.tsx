import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { modal } from '../../constants';
import { closeModal } from '../../reducer/modal';
import DialogWrapper from '../DialogWrapper';
import Button from '../Button/Button';
import { onDeleteBoard } from '../../reducer/board';
import { addDetails } from '../../reducer/boardDetails';
const { DELETE_BOARD } = modal;
export default function DeleteBoardModal() {
  const isOpen = useAppSelector((state) => state.modalReducers.isOpen);
  const board = useAppSelector((state) => state.boardReducers);
  const boardDetails = useAppSelector((state) => state.boardDetailsReducers);
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(
      onDeleteBoard({ boardIndex: boardDetails.boardSelectedIndex })
    );
    dispatch(addDetails({ boardSelectedIndex: 0 }));
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
        <p className="font-plus-jakarta-sans text-[13px] font-medium tracking-wider text-kanban-medium-grey">
          Are you sure you want to delete '
          {board[boardDetails.boardSelectedIndex]?.name ?? ''}' board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="flex h-10 flex-row gap-3">
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
