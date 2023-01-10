import React, { useState } from "react";
import {
  closestCenter,
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

import Item from "./Item";
import Container from "./Container";
import ColumnModal from "../ColumnModal";
import TaskModal, { Task } from "../TaskModal";
import uuid from "react-uuid";

export type Items = Record<UniqueIdentifier, Task[]>;

export default function Board() {
  const [activeId, setActiveId] = useState<Task | null>();
  const [items, setItems] = useState<Items>({
    root: [
      {
        id: uuid(),
        title: "example",
        description: "example",
        subtasks: [{ name: "example", done: false }],
        status: "root",
      },
      {
        id: uuid(),
        title: "example",
        description: "example",
        subtasks: [{ name: "example", done: false }],
        status: "root",
      },
      {
        id: uuid(),
        title: "example",
        description: "example",
        subtasks: [{ name: "example", done: false }],
        status: "root",
      },
      {
        id: uuid(),
        title: "example",
        description: "example",
        subtasks: [{ name: "example", done: false }],
        status: "root",
      },
    ],
    container1: [],
    container2: [],
    container3: [],
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
  console.log(activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={onDragCancel}
    >
      <button onClick={() => setIsModalTaskOpen(true)}>Add New Task</button>
      <div style={{ display: "flex", gap: "100px" }}>
        {Object.entries(items).map(([key, items]) => {
          return (
            <div
              style={{
                minHeight: "100px",
                minWidth: "100px",
                border: "1px solid black",
              }}
            >
              {key}
              <Container id={key} items={items} />
            </div>
          );
        })}
        <div>
          <button onClick={() => setIsModalOpen(true)}> Add New Column</button>
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <Item
            id={activeId.id!.toString()}
            title={activeId.title}
            subtasks={activeId.subtasks}
          />
        ) : null}
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

    const activeContainer = findContainer(active.id.toString());
    if (!activeContainer) {
      return;
    }
    const activeIndex = items[activeContainer].findIndex(
      (value) => value.id === active.id
    );
    setActiveId(items[activeContainer][activeIndex]);
    setClonedItems(items);
  }

  function findContainer(id: string) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) =>
      items[key].find((value) => value.id === id)
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId }: any = over;

    const activeContainer = findContainer(id.toString());
    const overContainer = findContainer(overId);

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
      (value) => value.id === overId
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
    const { id } = active;
    const { id: overId }: any = over;

    // Find the containers
    const activeContainer = findContainer(id.toString());
    const overContainer = findContainer(overId);

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
        (value) => value.id === overId
      );

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem = over && overIndex === overItems.length - 1;
        // draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      // const newItemList = { ...prev };
      // newItemList[activeContainer].splice(activeIndex, 1);
      // newItemList[overContainer].splice(
      //   newIndex,
      //   0,
      //   items[activeContainer][activeIndex]
      // );
      // return newItemList;

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
