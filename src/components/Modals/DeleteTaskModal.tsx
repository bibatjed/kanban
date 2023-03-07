import DialogWrapper from '../DialogWrapper';
import { closeModal } from '../../reducer/modal';
import { onDeleteTask } from '../../reducer/board';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Button from '../Button/Button';

export default function DeleteTaskModal() {
  const modal = useAppSelector((state) => state.modalReducers);
  const isOpen = modal.isOpen;
  const boardDetails = useAppSelector((state) => state.boardDetailsReducers);
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(
      onDeleteTask({
        id: modal.modalDetail?.id,
        boardIndex: boardDetails.boardSelectedIndex,
      })
    );
    dispatch(closeModal());
  }

  function handleCancel() {
    dispatch(closeModal());
  }
  return (
    <DialogWrapper
      isOpen={isOpen}
      title="Delete this task?"
      titleColor="red"
      onClose={() => dispatch(closeModal())}
    >
      <div className="mt-4 flex flex-col gap-7">
        <p className="font-plus-jakarta-sans text-[13px] font-medium tracking-wider text-kanban-medium-grey">
          Are you sure you want to delete '{modal.modalDetail?.title}' task and
          its subtasks? This action cannot be reversed.
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
