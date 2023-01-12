import { useState } from "react";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Item from "../Item";
import Column from "../Column";
import ColumnModal from "../ColumnModal";
import TaskModal, { Task } from "../TaskModal";
import uuid from "react-uuid";
import StatusCircle from "../StatusCircle";
import ColumnPlaceHolder from "../ColumnPlaceholder";

export type Items = Record<UniqueIdentifier, Task[]>;

export default function Board() {
  const [activeId, setActiveId] = useState<Task | null>();
  const [items, setItems] = useState<Items>({
    todo: [
      {
        id: uuid(),
        title: "example",
        description: "example",
        subtasks: [{ name: "example", done: false }],
        status: "root",
      },
      {
        id: uuid(),
        title: "example1",
        description: "example",
        subtasks: [{ name: "example", done: false }],
        status: "root",
      },
      {
        id: uuid(),
        title: "example2",
        description: "example",
        subtasks: [{ name: "example", done: false }],
        status: "root",
      },
      {
        id: uuid(),
        title: "example3",
        description: "example",
        subtasks: [{ name: "example", done: false }],
        status: "root",
      },
    ],
    doing: [],
    done: [],
  });
  const [clonedItems, setClonedItems] = useState<Items | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalTaskOpen, setIsModalTaskOpen] = useState(false);
  const handleSubmit = (value: string) => {
    setItems((prevItems) => ({ ...prevItems, [value]: [] }));
    setIsModalOpen(false);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={onDragCancel}
    >
      {/* <button onClick={() => setIsModalTaskOpen(true)}>Add New Task</button> */}
      <div className="flex gap-5 bg-kanban-light-grey-bg w-full min-h-[90%] p-10">
        {Object.entries(items).map(([key, items], idx) => {
          return (
            <div className="w-1/4">
              <div className="flex items-center flex-row gap-2 mb-7">
                <StatusCircle id={idx} />
                <span className="font-plus-jakarta-sans text-[15px] text-kanban-medium-grey uppercase">
                  {" "}
                  {key}
                </span>
                <span className="font-plus-jakarta-sans text-[15px] text-kanban-medium-grey">
                  ({items.length})
                </span>
              </div>
              <Column id={key} items={items} />
            </div>
          );
        })}
        <div className="w-1/4">
          <div className="mb-7 w-[445px] h-[24px]"></div>
          <ColumnPlaceHolder />
        </div>
      </div>
      <DragOverlay>
        {activeId && (
          <Item
            id={activeId.id!.toString()}
            title={activeId.title}
            subtasks={activeId.subtasks}
          />
        )}
      </DragOverlay>
      {isModalOpen && <ColumnModal submit={handleSubmit} />}
      {isModalTaskOpen && (
        <TaskModal
          submit={(values: Task) => {
            setItems((prev) => {
              const items = { ...prev };
              items[values.status].push({ id: uuid(), ...values });
              return items;
            });
            setIsModalTaskOpen(false);
          }}
        />
      )}
    </DndContext>
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    const activeContainer = active?.data?.current?.columnId;
    if (!activeContainer) {
      return;
    }
    const activeIndex = items[activeContainer].findIndex(
      (value) => value.id === active.id
    );
    setActiveId(items[activeContainer][activeIndex]);
    setClonedItems(items);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    const activeContainer = active?.data?.current?.columnId;
    const overContainer = over?.data?.current?.columnId;
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].findIndex(
      (value) => value.id === active.id
    );
    const overIndex = items[overContainer].findIndex(
      (value) => value.id === over?.id
    );

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveId(null);
  }

  function onDragCancel() {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems);
    }
    setActiveId(null);
    setClonedItems(null);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    console.log(event);
    // Find the containers
    const activeContainer = active?.data?.current?.columnId;
    const overContainer = over?.data?.current?.columnId;
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = items[activeContainer].findIndex(
        (value) => value.id === active.id
      );
      const overIndex = items[overContainer].findIndex(
        (value) => value.id === over!.id
      );

      let newIndex;
      if (over?.id || "" in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem = over && overIndex === overItems.length - 1;
        // draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item.id !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          prev[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }
}
