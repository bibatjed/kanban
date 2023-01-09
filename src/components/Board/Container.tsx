import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";
import { Task } from "../TaskModal";

const containerStyle = {
  background: "#dadada",
  padding: 10,
  margin: 10,
  flex: 1,
};

type ContainerProps = {
  id: string;
  items: Task[];
};

export default function Container(props: ContainerProps) {
  const { id, items } = props;
  const idItems = items.map((value) => value.id) as string[];
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={idItems}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} style={containerStyle}>
        {items.map((item) => (
          <SortableItem
            key={item.id}
            id={item.id!}
            title={item.title}
            subtasks={`${item.subtasks.reduce(
              (acc, currentvalue) => acc + (currentvalue.done ? 1 : 0),
              0
            )}/${item.subtasks.length}`}
          />
        ))}
      </div>
    </SortableContext>
  );
}
