import IconAddTaskMobile from '../../assets/icons/IconAddTaskMobile';
import IconCross from '../../assets/icons/IconCross';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { onEditBoard } from '../../reducer/board';
import Button from '../Button/Button';
import DialogWrapper from '../DialogWrapper';
import Input from '../Input';
import { modal } from '../../constants';
import { closeModal as reducerCloseModal } from '../../reducer/modal';
import useBoardModal from './hooks/useBoardModal';
import { useEffect, useRef } from 'react';
import { shallowEqual } from 'react-redux';

const { EDIT_BOARD } = modal;

export default function EditBoardModal() {
  const modal = useAppSelector((state) => state.modalReducers);
  const isOpen = modal.isOpen && modal.modalType === EDIT_BOARD;
  const boardDetails = useAppSelector((state) => state.boardDetailsReducers);
  const state = useAppSelector((state) => state.boardReducers);
  const container = state[boardDetails.boardSelectedIndex]?.columns ?? [];
  const boardName = state[boardDetails.boardSelectedIndex]?.name ?? '';
  const boardNames = state
    .filter((item) => item.name.toLowerCase() !== boardName.toLowerCase())
    .map((item) => item.name.toLowerCase());

  const dispatch = useAppDispatch();
  const {
    formValues,
    errorValues,
    handleAddColumn,
    handleOnChangeCommon,
    handleOnChangeArray,
    handleDeleteColumn,
    checkColumnFields,
  } = useBoardModal(
    {
      boardName,
      columns: container.map((value) => {
        return {
          old: value.container,
          new: value.container,
          itemLength: value.task.length,
        };
      }),
    },
    boardNames
  );
  function handleSubmit() {
    if (!checkColumnFields()) {
      return;
    }

    dispatch(
      onEditBoard({
        board: formValues,
        boardIndex: boardDetails.boardSelectedIndex,
      })
    );
    closeModal();
  }
  function closeModal() {
    dispatch(reducerCloseModal());
  }

  return (
    <DialogWrapper isOpen={isOpen} title="Edit Board" onClose={closeModal}>
      {/* Dialog Body */}
      <div className="mt-2 flex flex-col gap-4">
        {/* BOARD NAME */}
        <div className="flex flex-col gap-2">
          <span className="font-plus-jakarta-sans text-sm font-semibold text-kanban-medium-grey">
            Board Name
          </span>
          <Input
            error={errorValues.boardName}
            name="boardName"
            onChange={handleOnChangeCommon}
            value={formValues.boardName}
          />
        </div>

        {/* Columns  */}
        <div className="flex flex-col gap-2">
          <span className="font-plus-jakarta-sans text-sm font-semibold text-kanban-medium-grey">
            Columns
          </span>
          {formValues.columns.map((value, index) => {
            const disableDelete = value.itemLength > 0;
            return (
              <div key={index} className="flex flex-row items-center gap-4">
                <Input
                  error={errorValues.columns[index]}
                  dataId={index}
                  onChange={handleOnChangeArray}
                  value={value.new}
                />{' '}
                <div>
                  <Button
                    onClick={() => {
                      handleDeleteColumn(index);
                    }}
                    disabled={disableDelete}
                    variant="none"
                  >
                    <IconCross
                      className={`${
                        disableDelete
                          ? 'fill-gray-400 dark:fill-gray-600'
                          : 'fill-kanban-medium-grey'
                      }`}
                    />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-6">
          {formValues.columns.length < 6 && (
            <Button
              onClick={handleAddColumn}
              text="Add New Column"
              variant="secondary"
            >
              <IconAddTaskMobile className="fill-kanban-main-purple" />
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            text="Save Changes"
            variant="primary"
          />
        </div>
      </div>
    </DialogWrapper>
  );
}
