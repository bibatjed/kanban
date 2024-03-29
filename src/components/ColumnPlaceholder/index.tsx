import IconAdd from "../../assets/icons/IconAddTaskMobile";
import { useAppDispatch } from "../../hooks/redux";
import { openModal } from "../../reducer/modal";
import { modal } from "../../constants";

const { ADD_COLUMN } = modal;
export default function ColumnPlaceHolder() {
  const dispatch = useAppDispatch();
  function onClick() {
    dispatch(openModal({ type: ADD_COLUMN }));
  }
  return (
    <div
      onClick={onClick}
      className="w-full h-full transition-all duration-150 ease-in dark:from-kanban-lines-dark dark:to-kanban-dark-grey bg-gradient-to-b from-kanban-lines-light to-kanban-medium-grey cursor-pointer rounded-md flex justify-center group"
    >
      <div className="flex items-center justify-center gap-3">
        <IconAdd className="fill-kanban-medium-grey group-hover:fill-kanban-main-purple" />
        <span className="font-plus-jakarta-sans text-lg font-bold text-kanban-medium-grey group-hover:text-kanban-main-purple">
          New Column
        </span>
      </div>
    </div>
  );
}
