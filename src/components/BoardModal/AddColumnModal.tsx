import IconAddTaskMobile from '../../assets/icons/IconAddTaskMobile';
import IconCross from '../../assets/icons/IconCross';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ContainerState, onEditBoard } from '../../reducer/board';
import Button from '../Button/Button';
import DialogWrapper from '../DialogWrapper';
import Input from '../Input';
import { modal } from '../../constants';
import { closeModal as reducerCloseModal } from '../../reducer/modal';
import useBoardModal from './hooks/useBoardModal';
type Columns = {
  old: string | null;
  new: string;
  itemLength: number;
  error?: string;
};
type FormValues = {
  boardName: string;
  columns: Columns[];
};

const { ADD_COLUMN } = modal;

export default function AddColumModal() {
  const modal = useAppSelector((state) => state.modalReducers);
  const isOpen = modal.isOpen && modal.modalType === ADD_COLUMN;
  const boardDetails = useAppSelector((state) => state.boardDetailsReducers);
  const state = useAppSelector((state) => state.boardReducers);
  const container = state[boardDetails.boardSelectedIndex]?.columns ?? [];
  const boardName = state[boardDetails.boardSelectedIndex]?.name ?? '';
  const dispatch = useAppDispatch();

  const {
    formValues,
    errorValues,
    handleAddColumn,
    handleOnChangeArray,
    handleDeleteColumn,
    checkColumnFields,
  } = useBoardModal(
    {
      boardName: boardName,
      columns: [
        ...container.map((value, idx) => {
          return {
            old: value.container,
            new: value.container,
            index: idx,
            itemLength: value.task.length,
          };
        }),
      ],
    },
    [],
    isOpen
  );

  function handleSubmit() {
    if (!checkColumnFields()) {
      return;
    }
    const containers: ContainerState[] = [];
    for (let column of formValues.columns) {
      const task = column.old
        ? container.find((item) => item.container === column.old)!.task
        : [];
      containers.push({
        container: column.new,
        task: [...task],
      });
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
            <span className="font-plus-jakarta-sans text-sm font-semibold text-kanban-medium-grey">
              Board Name
            </span>
            <Input value={formValues.boardName} isReadOnly={true} />
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
                            ? 'fill-gray-300'
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
    </>
  );
}
