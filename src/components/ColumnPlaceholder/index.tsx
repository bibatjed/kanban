import IconAdd from "../../assets/icons/IconAddTaskMobile";
import { useAppDispatch } from "../../hooks/redux";
import { openColumnModal } from "../../reducer/modal";
export default function ColumnPlaceHolder() {
  const dispatch = useAppDispatch();
  function onClick() {
    dispatch(openColumnModal());
  }
  return (
    <div
      onClick={onClick}
      className="w-full h-full bg-gradient-to-b from-kanban-lines-light to-kanban-medium-grey cursor-pointer rounded-md flex justify-center group"
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
