import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
type DroppableProps = {
  id: string;
  children: ReactNode | ReactNode[];
};
export default function Droppable(props: DroppableProps) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return <div ref={setNodeRef}>{props.children} </div>;
}
