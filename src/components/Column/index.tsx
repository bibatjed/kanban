import { useMemo, useRef } from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "../SortableItem";
import { Task } from "../TaskModal/hooks/useTask";

type ColumnProps = {
  id: string;
  containerIndex: number;
  items: Task[];
};

export default function Column(props: ColumnProps) {
  const { id, items = [], containerIndex } = props;
  const itemIds: string[] = useMemo(
    () => items.map((item) => item.id!),
    [items]
  );
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
      <div className={`h-full ${borderBroken}`}>
        <div
          ref={setNodeRef}
          className={`flex flex-col gap-2 w-full bg-kanban-light-grey-bg`}
        >
          {items.map((item) => (
            <SortableItem
              key={item.id}
              id={item.id!}
              containerIndex={containerIndex}
              columnId={id}
              title={item.title}
              subtasks={`${item.subtaskComplete || 0} of ${
                item.subtasks?.length
              } subtasks`}
            />
          ))}
        </div>
      </div>
    </SortableContext>
  );
}
