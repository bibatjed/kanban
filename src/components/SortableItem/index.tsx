import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortabileItemProps = {
  id: string;
  title: string;
  subtasks: string;
};
export default function SortableItem(props: SortabileItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="kanban-item"
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
