import IconAddTaskMobile from '../../assets/icons/IconAddTaskMobile';
import IconCross from '../../assets/icons/IconCross';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { onAddNewBoard } from '../../reducer/board';
import Button from '../Button/Button';
import DialogWrapper from '../DialogWrapper';
import Input from '../Input';
import { modal } from '../../constants';
import { closeModal as reducerCloseModal } from '../../reducer/modal';
import { addDetails } from '../../reducer/boardDetails';
import useBoardModal from './hooks/useBoardModal';

export default function CreateBoardModal() {
  const isOpen = useAppSelector((state) => state.modalReducers.isOpen);
  const state = useAppSelector((state) => state.boardReducers);
  const boardNames = state.map((item) => item.name.toLowerCase());
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
      boardName: '',
      columns: [{ old: null, new: '', itemLength: 0 }],
    },
    boardNames
  );

  function handleSubmit() {
    if (!checkColumnFields()) {
      return;
    }

    dispatch(onAddNewBoard(formValues));
    dispatch(addDetails({ boardSelectedIndex: boardNames.length }));
    closeModal();
  }
  function closeModal() {
    dispatch(reducerCloseModal());
  }

  return (
    <DialogWrapper isOpen={isOpen} title="Add New Board" onClose={closeModal}>
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
            return (
              <div key={index} className="flex flex-row items-center gap-4">
                <Input
                  dataId={index}
                  error={errorValues.columns[index]}
                  onChange={handleOnChangeArray}
                  value={value.new}
                />{' '}
                <div>
                  <Button
                    onClick={() => {
                      handleDeleteColumn(index);
                    }}
                    variant="none"
                  >
                    <IconCross className={`${'fill-kanban-medium-grey'}`} />
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
            text="Create New Board"
            variant="primary"
          />
        </div>
      </div>
    </DialogWrapper>
  );
}
