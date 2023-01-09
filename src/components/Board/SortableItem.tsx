import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type DroppableProps = {
  id: string;
  title: string;
  subtasks: string;
};
export default function SortableItem(props: DroppableProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  };

  return (
    //@ts-ignore
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <span>{props.title}</span>
      <span>{props.subtasks}</span>
    </div>
  );
}
