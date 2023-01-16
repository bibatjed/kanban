import React, { useMemo } from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "../SortableItem";
import { Task } from "../TaskModal";

type ColumnProps = {
  id: string;
  containerIndex: number;
  items: Task[];
};

export default function Column(props: ColumnProps) {
  const { id, items, containerIndex } = props;
  const itemIds = useMemo(
    () => items.map((item) => item.id),
    [items]
  ) as string[]; // ["1", "2", "3"]
  const borderBroken =
    items.length === 0
      ? "border-dashed border-kanban-lines-light border-2 rounded-md"
      : "";
  const { setNodeRef } = useSortable({
    id,
    data: {
      columnId: id,
      containerIndex: containerIndex,
    },
  });

  return (
    <SortableContext
      id={id}
      items={itemIds}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        className={`flex flex-col gap-2 w-ful bg-kanban-light-grey-bg h-full ${borderBroken}`}
      >
        {items.map((item) => (
          <SortableItem
            key={item.id}
            id={item.id!}
            containerIndex={containerIndex}
            columnId={id}
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
