import { useEffect, useState } from "react";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TraversalOrder,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Item from "../Item";
import Column from "../Column";
import { Task } from "../TaskModal/hooks/useTask";
import StatusCircle from "../StatusCircle";
import ColumnPlaceHolder from "../ColumnPlaceholder";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ContainerState, updateBoard } from "../../reducer/board";
import SideBarShow from "../SidebarShow";

export type Items = {
  container: string;
  task: Task[];
};

export default function Board() {
  const [activeId, setActiveId] = useState<Task | null>();
  const boardDetails = useAppSelector((state) => state.boardDetailsReducers);
  const containerResult = useAppSelector((state) => state.containerReducers);
  const container: ContainerState[] =
    containerResult[boardDetails.boardSelectedIndex].columns;
  const isSidebarOpen = useAppSelector((state) => state.sidebarReducers.isOpen);
  const dispatch = useAppDispatch();
  const [clonedItems, setClonedItems] = useState<Items[] | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={onDragCancel}
      //NOTE: ADD TO ENABLED AUTO SCROLL
      autoScroll={{ order: TraversalOrder.ReversedTreeOrder }}
    >
      <div
        className={`${
          isSidebarOpen ? "pl-80" : ""
        } transition-all duration-200 bg-kanban-light-grey-bg overflow-y-auto w-full h-[90%] p-10 pt-5`}
      >
        <div className="flex flex-row gap-5 min-h-[97%]">
          {container.map((item, idx) => {
            return (
              <div key={idx} className="min-w-[250px]">
                <div className="flex items-center flex-row gap-2 mb-7">
                  <StatusCircle id={idx} />
                  <span className="font-plus-jakarta-sans text-[15px] text-kanban-medium-grey uppercase">
                    {" "}
                    {item.container}
                  </span>
                  <span className="font-plus-jakarta-sans text-[15px] text-kanban-medium-grey">
                    ({item.task.length})
                  </span>
                </div>
                <Column
                  id={item.container}
                  containerIndex={idx}
                  items={item.task}
                />
              </div>
            );
          })}

          {Object.keys(container).length < 6 && (
            <div className="min-w-[250px]">
              <div className="mb-7 h-[24px]"></div>
              <ColumnPlaceHolder />
            </div>
          )}
        </div>
        <SideBarShow />
      </div>
      <DragOverlay>
        {activeId && (
          <Item
            id={activeId.id!.toString()}
            title={activeId.title}
            subtasks={activeId.subtasks}
            subtaskComplete={activeId.subtaskComplete}
          />
        )}
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    const activeContainer = active?.data?.current?.containerIndex;
    if (activeContainer == null) {
      return;
    }
    const activeIndex = container[activeContainer].task.findIndex(
      (value) => value.id === active.id
    );
    setActiveId(container[activeContainer].task[activeIndex]);
    setClonedItems(container);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    const activeContainer = active?.data?.current?.containerIndex;
    const overContainer = over?.data?.current?.containerIndex;
    if (
      activeContainer == null ||
      overContainer == null ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = container[activeContainer].task.findIndex(
      (value) => value.id === active.id
    );
    const overIndex = container[overContainer].task.findIndex(
      (value) => value.id === over?.id
    );

    if (activeIndex !== overIndex) {
      const newItem = structuredClone(container);
      newItem[overContainer].task = arrayMove(
        container[overContainer].task,
        activeIndex,
        overIndex
      );
      dispatch(
        updateBoard({
          column: newItem,
          boardIndex: boardDetails.boardSelectedIndex,
        })
      );
    }

    setActiveId(null);
  }

  function onDragCancel() {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      // setItems(clonedItems);
    }
    setActiveId(null);
    setClonedItems(null);
  }
  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    // Find the containers
    const activeContainer = active?.data?.current?.containerIndex;
    const overContainer = over?.data?.current?.containerIndex;
    const newColumn = over?.data?.current?.columnId;
    if (
      activeContainer == null ||
      overContainer == null ||
      activeContainer === overContainer
    ) {
      return;
    }

    const overItems = container[overContainer].task;

    // Find the indexes for the items
    const activeIndex = container[activeContainer].task.findIndex(
      (value) => value.id === active.id
    );
    const overIndex = container[overContainer].task.findIndex(
      (value) => value.id === over!.id
    );

    let newIndex;
    if (over?.id) {
      // We're at the root droppable of a container
      newIndex = overItems.length + 1;
    } else {
      const isBelowLastItem = over && overIndex === overItems.length - 1;
      // draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

      const modifier = isBelowLastItem ? 1 : 0;
      newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
    }

    const newItem = structuredClone(container);
    newItem[activeContainer].task = container[activeContainer].task.filter(
      (item) => item.id !== active.id
    );
    const task = { ...container[activeContainer].task[activeIndex] };
    task.status = newColumn;
    newItem[overContainer].task = [
      ...container[overContainer].task.slice(0, newIndex),
      task,
      ...container[overContainer].task.slice(
        newIndex,
        container[overContainer].task.length
      ),
    ];
    dispatch(
      updateBoard({
        column: newItem,
        boardIndex: boardDetails.boardSelectedIndex,
      })
    );
  }
}
