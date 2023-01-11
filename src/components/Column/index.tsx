import React, { useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "../SortableItem";
import { Task } from "../TaskModal";

type ColumnProps = {
  id: string;
  items: Task[];
};

export default function Column(props: ColumnProps) {
  const { id, items } = props;
  const itemIds = useMemo(
    () => items.map((item) => item.id),
    [items]
  ) as string[]; // ["1", "2", "3"]
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={itemIds}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        className="flex flex-col gap-2 w-ful bg-kanban-light-grey-bg h-full"
      >
        {items.map((item) => (
          <SortableItem
            key={item.id}
            id={item.id!}
            title={item.title}
            subtasks={`${item.subtasks.reduce(
              (acc, currentvalue) => acc + (currentvalue.done ? 1 : 0),
              0
            )} of ${item.subtasks.length} subtasks`}
          />
        ))}
      </div>
    </SortableContext>
  );
}
