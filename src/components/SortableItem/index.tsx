import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useAppDispatch } from "../../hooks/redux";
import { modal } from "../../constants";
import { openModal } from "../../reducer/modal";
type SortableItemProps = {
  id: string;
  containerIndex: number;
  columnId: string;
  title: string;
  subtasks: string;
};

const { VIEW_TASK } = modal;

export default function SortableItem(props: SortableItemProps) {
  const dispatch = useAppDispatch();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      data: {
        columnId: props.columnId,
        containerIndex: props.containerIndex,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="kanban-item"
      onClick={() =>
        dispatch(openModal({ type: VIEW_TASK, detail: { id: props.id } }))
      }
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <span className="text-[18px] font-semibold">{props.title}</span>
      <span className="text-[12px] font-light text-kanban-medium-grey">
        {props.subtasks}
      </span>
    </div>
  );
}
