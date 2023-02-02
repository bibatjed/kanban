import { useEffect, useState } from 'react';
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
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import Item from '../Item';
import Column from '../Column';
import { Task } from '../TaskModal/hooks/useTask';
import StatusCircle from '../StatusCircle';
import ColumnPlaceHolder from '../ColumnPlaceholder';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  ContainerState,
  onHandleDragEnd,
  updateBoard,
} from '../../reducer/board';
import SideBarShow from '../SidebarShow';
import { useMediaQuery } from 'react-responsive';

export type Items = {
  container: string;
  task: Task[];
};

export default function Board() {
  const isMobile = useMediaQuery({
    query: '(max-width: 764px)',
  });
  const [activeId, setActiveId] = useState<Task | null>();
  const boardDetails = useAppSelector((state) => state.boardDetailsReducers);
  const containerResult = useAppSelector((state) => state.boardReducers);
  const container: ContainerState[] =
    containerResult[boardDetails.boardSelectedIndex]?.columns ?? [];
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

    dispatch(
      onHandleDragEnd({
        boardIndex: boardDetails.boardSelectedIndex,
        activeContainer,
        overContainer,
        activeId: active.id.toString(),
        overId: over?.id?.toString() || '',
      })
    );
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
          isSidebarOpen && !isMobile ? 'pl-80' : ''
        } flex h-[100%] w-full gap-7 overflow-y-auto bg-kanban-light-grey-bg p-10 pt-5 transition-all duration-200 dark:bg-kanban-very-dark-gray`}
      >
        {container.map((item, idx) => {
          return (
            <div key={idx} className="h-[calc(100%_-_120px)] min-w-[250px]">
              <div className="mb-7 flex flex-row items-center gap-2">
                <StatusCircle id={idx} />
                <span className="font-plus-jakarta-sans text-[15px] uppercase tracking-wider text-kanban-medium-grey">
                  {' '}
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

        {container.length < 6 && (
          <div className="h-[calc(100%_-_120px)] min-w-[250px]">
            <div className="mb-7 h-[24px]"></div>
            <ColumnPlaceHolder />
          </div>
        )}
        {!isMobile && <SideBarShow />}
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
}
