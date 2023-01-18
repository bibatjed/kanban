import DialogWrapper from "../DialogWrapper";

import { modal } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { closeModal } from "../../reducer/modal";
import { onChangeStatus as changeStatus } from "../../reducer/column";
import Select from "../Select";
import CheckBox from "../CheckBox";
import { onClickSubtasks, selectTask } from "../../reducer/column";
const { VIEW_TASK } = modal;
export default function ViewTaskModal() {
  const modal = useAppSelector((state) => state.modalReducers);
  const isOpen = modal.isOpen && modal.modalType === VIEW_TASK;
  const task = selectTask(modal.modalDetail?.id as string);
  const data = useAppSelector((state) => state.containerReducers);

  const statusList = data.map((value) => value.container);
  const dispatch = useAppDispatch();

  function onChangeStatus(value: string) {
    dispatch(
      changeStatus({
        type: "",
        id: modal.modalDetail?.id as string,
        status: value,
      })
    );
  }
  return (
    <DialogWrapper
      isOpen={isOpen}
      title={task?.title as string}
      onClose={() => dispatch(closeModal())}
    >
      {/* Dialog Body */}
      <div className="mt-2 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="font-plus-jakarta-sans text-sm font-normal tracking-wide leading-7 text-kanban-medium-grey">
            {task?.description || "No description."}
          </p>
        </div>
        {/* Subtasks  */}
        <div className="flex flex-col gap-2">
          <span className="font-plus-jakarta-sans text-sm font-semibold text-kanban-medium-grey">
            Subtasks {task?.subtaskComplete || 0} of{" "}
            {task?.subtasks.length || 0}
          </span>
          <div className="flex flex-col items-center gap-4">
            {task?.subtasks.map((value, idx) => {
              return (
                <CheckBox
                  key={idx}
                  text={value.name}
                  value={value.done}
                  onClick={() =>
                    dispatch(
                      onClickSubtasks({
                        id: modal.modalDetail!.id as string,
                        type: "",
                        subtaskIdx: idx,
                      })
                    )
                  }
                />
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-6">
          <div className="flex relative flex-col gap-2">
            <span className="font-plus-jakarta-sans text-sm font-semibold text-kanban-medium-grey">
              Current Status
            </span>
            <Select
              name="status"
              onChange={onChangeStatus}
              value={task?.status as string}
              list={statusList}
            />
          </div>
        </div>
      </div>
    </DialogWrapper>
  );
}
