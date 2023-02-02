import uuid from 'react-uuid';
import IconAddTaskMobile from '../../assets/icons/IconAddTaskMobile';
import IconCross from '../../assets/icons/IconCross';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addNewTask } from '../../reducer/board';
import { closeModal } from '../../reducer/modal';
import Button from '../Button/Button';
import DialogWrapper from '../DialogWrapper';
import { modal } from '../../constants';
import Input from '../Input';
import Select from '../Select';
import TextArea from '../TextArea';
import useTask from './hooks/useTask';
import { useEffect } from 'react';

const { ADD_TASK } = modal;

export default function TaskModal() {
  const modal = useAppSelector((state) => state.modalReducers);
  const boardDetails = useAppSelector((state) => state.boardDetailsReducers);
  const isOpen = modal.isOpen && modal.modalType === ADD_TASK;
  const data = useAppSelector((state) => state.boardReducers);
  const columns = data[boardDetails.boardSelectedIndex]?.columns ?? [];
  const statusList = columns.map((value) => value.container);
  const dispatch = useAppDispatch();
  const {
    formValues,
    checkColumnFields,
    handleAddSubtasks,
    handleDeleteSubtasks,
    onChangeCommon,
    onChangeStatus,
    onChangeSubtasks,
    reset,
  } = useTask({
    title: '',
    description: '',
    subtasks: [{ name: '', done: false }],
    subtaskComplete: 0,
    status: statusList[0],
  });

  useEffect(() => {
    if (isOpen && modal.modalType === ADD_TASK) {
      reset();
    }
  }, [isOpen, modal.modalType]);

  function handleSubmit() {
    if (!checkColumnFields()) {
      return;
    }
    dispatch(
      addNewTask({
        task: { id: uuid(), ...formValues },
        boardIndex: boardDetails.boardSelectedIndex,
      })
    );
    dispatch(closeModal());
  }

  return (
    <DialogWrapper
      title="Add New Task"
      isOpen={isOpen}
      onClose={() => dispatch(closeModal())}
    >
      {/* Dialog Body */}
      <div className="mt-2 flex flex-col gap-4">
        {/* BOARD NAME */}
        <div className="flex flex-col gap-2">
          <span className="font-plus-jakarta-sans text-sm font-semibold text-kanban-medium-grey">
            Title
          </span>
          <Input
            error={formValues.errorTitle}
            name="title"
            value={formValues.title}
            onChange={onChangeCommon}
            placeholder="e.g. Take coffee break"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-plus-jakarta-sans text-sm font-semibold text-kanban-medium-grey">
            Description
          </span>
          <TextArea
            name="description"
            value={formValues.description}
            onChange={onChangeCommon}
          />
        </div>
        {/* Columns  */}
        <div className="flex flex-col gap-2">
          <span className="font-plus-jakarta-sans text-sm font-semibold text-kanban-medium-grey">
            Subtasks
          </span>
          {formValues.subtasks.map((value, index) => {
            return (
              <div key={index} className="flex flex-row items-center gap-4">
                <Input
                  placeholder="e.g. Make Coffee"
                  name={index.toString()}
                  onChange={onChangeSubtasks}
                  value={value.name}
                  error={value.error}
                />{' '}
                <div>
                  <Button
                    onClick={() => handleDeleteSubtasks(index)}
                    text=""
                    variant="none"
                  >
                    <IconCross className="fill-kanban-medium-grey" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-6">
          {formValues.subtasks.length < 7 && (
            <Button
              text="Add New Subtasks"
              onClick={handleAddSubtasks}
              variant="secondary"
            >
              <IconAddTaskMobile className="fill-kanban-main-purple" />
            </Button>
          )}
          <div className="relative flex flex-col gap-2">
            <span className="font-plus-jakarta-sans text-sm font-semibold text-kanban-medium-grey">
              Status
            </span>
            <Select
              name="status"
              onChange={onChangeStatus}
              value={formValues.status}
              list={statusList}
            />
          </div>
          <Button text="Create Task" onClick={handleSubmit} variant="primary" />
        </div>
      </div>
    </DialogWrapper>
  );
}
