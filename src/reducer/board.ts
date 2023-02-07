import {
  AnyAction,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import uuid from 'react-uuid';
// Define a type for the slice state
import { Task } from '../components/Modals/hooks/useTask';
import produce from 'immer';
import { BoardFormValues } from '../components/Modals/hooks/useBoardModal';
import InitialStateParser from '../helper/initialStateParser';

import { arrayMove } from '@dnd-kit/sortable';
export type Items = {
  container: string;
  task: Task[];
};

export type Board = {
  name: string;
  columns: Items[];
};

const initialState = InitialStateParser<Board[]>('board', [
  {
    name: 'Example',
    columns: [
      {
        container: 'todo',
        task: [
          {
            id: uuid(),
            title: 'example',
            description: 'example',
            subtasks: [{ name: 'example', done: false }],
            status: 'todo',
            subtaskComplete: 0,
          },
          {
            id: uuid(),
            title: 'example1',
            description: 'example',
            subtasks: [{ name: 'example', done: false }],
            status: 'todo',
            subtaskComplete: 0,
          },
          {
            id: uuid(),
            title: 'example2',
            description: 'example',
            subtasks: [{ name: 'example', done: false }],
            status: 'todo',
            subtaskComplete: 0,
          },
          {
            id: uuid(),
            title: 'example3',
            description: 'example',
            subtasks: [{ name: 'example', done: false }],
            status: 'todo',
            subtaskComplete: 0,
          },
        ],
      },
      {
        container: 'doing',
        task: [],
      },
      { container: 'done', task: [] },
    ],
  },
  {
    name: 'Example1',
    columns: [
      {
        container: 'todo',
        task: [],
      },
    ],
  },
]);
// Define the initial state using that type

export const boardSlice = createSlice({
  name: 'container',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    onHandleDragOver: (
      state,
      action: PayloadAction<{
        activeContainer: number;
        overContainer: number;
        overId: string;
        activeId: string;
        boardIndex: number;
      }>
    ) => {
      const { activeContainer, overContainer, overId, activeId, boardIndex } =
        action.payload;

      const newState = produce(state, (draft) => {
        const overItems = draft[boardIndex].columns[overContainer].task;

        // Find the indexes for the items
        const activeIndex = draft[boardIndex].columns[
          activeContainer
        ].task.findIndex((value) => value.id === activeId);

        const overIndex = draft[boardIndex].columns[
          overContainer
        ].task.findIndex((value) => value.id === overId);

        //remove item from old container
        const item = draft[boardIndex].columns[activeContainer].task.splice(
          activeIndex,
          1
        );

        const newContainer = draft[boardIndex].columns[overContainer].container;

        //assign newIndex
        const newIndex =
          overIndex === overItems.length - 1
            ? overItems.length
            : overIndex < 0
            ? 0
            : overIndex;

        //update status of selected item
        item[0].status = newContainer;

        //add item to new container
        draft[boardIndex].columns[overContainer].task.splice(
          newIndex,
          0,
          item[0]
        );
      });

      return newState;
    },
    onHandleDragEnd: (
      state,
      action: PayloadAction<{
        activeContainer: number;
        overContainer: number;
        overId: string;
        activeId: string;
        boardIndex: number;
      }>
    ) => {
      const { activeContainer, overContainer, overId, activeId, boardIndex } =
        action.payload;
      const newState = produce(state, (draft) => {
        const activeIndex = draft[boardIndex].columns[
          activeContainer
        ].task.findIndex((value) => value.id === activeId);

        const overIndex = draft[boardIndex].columns[
          overContainer
        ].task.findIndex((value) => value.id === overId);

        if (activeIndex !== overIndex) {
          draft[boardIndex].columns[overContainer].task = arrayMove(
            draft[boardIndex].columns[overContainer].task,
            activeIndex,
            overIndex
          );
        }
      });
      return newState;
    },
    addNewTask: (
      state,
      action: PayloadAction<{ task: Task; boardIndex: number }>
    ) => {
      const task = action.payload.task;
      const status = task.status;
      const boardIndex = action.payload.boardIndex;
      const statusIndex = state[boardIndex].columns.findIndex(
        (item) => item.container === status
      );
      const newState = produce(state, (draft) => {
        draft[boardIndex].columns[statusIndex].task.push(task);
      });

      return newState;
    },
    onClickSubtasks: (state, action: PayloadAction<AnyAction>) => {
      const subtaskIndex = action.payload.subtaskIdx;
      const id = action.payload.id;
      const boardIndex = action.payload.boardIndex;
      const newState = produce(state, (draft) => {
        for (const item of draft[boardIndex].columns) {
          let taskIndex = item.task.findIndex((value) => {
            return value.id === id;
          });

          if (taskIndex > -1) {
            const currentStatus =
              item.task[taskIndex].subtasks[subtaskIndex].done;

            item.task[taskIndex].subtaskComplete += !currentStatus ? 1 : -1;
            item.task[taskIndex].subtasks[subtaskIndex].done = !currentStatus;
          }
        }
      });

      return newState;
    },
    onChangeStatus: (state, action: PayloadAction<AnyAction>) => {
      const boardIndex = action.payload.boardIndex;
      const id = action.payload.id;
      const status = action.payload.status;
      const newState = produce(state, (draft) => {
        for (let item of draft[boardIndex].columns) {
          const findTaskIndex = item.task.findIndex((value) => value.id === id);

          if (findTaskIndex > -1) {
            if (item.task[findTaskIndex].status === status) return;
            const task: Task = item.task.splice(findTaskIndex, 1)[0];

            const newStatusContainerIndex = draft[boardIndex].columns.findIndex(
              (value) => value.container === status
            );
            task.status = status;
            draft[boardIndex].columns[newStatusContainerIndex].task.push(task);
          }
        }
      });

      return newState;
    },
    onEditTask: (
      state,
      action: PayloadAction<{ task: Task; boardIndex: number }>
    ) => {
      const boardIndex = action.payload.boardIndex;
      const id = action.payload.task.id;
      const taskPayload = action.payload.task;
      const newState = produce(state, (draft) => {
        for (let item of draft[boardIndex].columns) {
          const findTaskIndex = item.task.findIndex((value) => value.id === id);

          if (findTaskIndex > -1) {
            const originalStatus = item.task[findTaskIndex].status;
            const newStatus = taskPayload.status;

            if (originalStatus === newStatus) {
              item.task[findTaskIndex] = {
                ...action.payload.task,
              };
              return;
            }

            const newStatusContainerIndex = draft[boardIndex].columns.findIndex(
              (value) => value.container === taskPayload.status
            );

            let task: Task = item.task.splice(findTaskIndex, 1)[0];

            task = { ...taskPayload };

            draft[boardIndex].columns[newStatusContainerIndex].task.push(task);
          }
        }
      });
      return newState;
    },
    onDeleteTask: (state, action: PayloadAction<AnyAction>) => {
      const boardIndex = action.payload.boardIndex;
      const id = action.payload.id;
      const newState = produce(state, (draft) => {
        for (let item of draft[boardIndex].columns) {
          const findTaskIndex = item.task.findIndex((value) => value.id === id);

          if (findTaskIndex > -1) {
            item.task.splice(findTaskIndex, 1);
            break;
          }
        }
      });
      return newState;
    },

    onDeleteBoard: (state, action: PayloadAction<AnyAction>) => {
      const newState = produce(state, (draft) => {
        const boardIndex = action.payload.boardIndex;
        draft.splice(boardIndex, boardIndex + 1);
      });
      return newState;
    },
    onAddNewBoard: (state, action: PayloadAction<BoardFormValues>) => {
      const newState = produce(state, (draft) => {
        const columnName = action.payload.columns.map((item) => item.new);
        const columns = columnName.map((name) => {
          return {
            container: name,
            task: [],
          };
        });

        draft.push({
          name: action.payload.boardName,
          columns,
        });
      });
      return newState;
    },
    onEditBoard: (
      state,
      action: PayloadAction<{ board: BoardFormValues; boardIndex: number }>
    ) => {
      const boardIndex = action.payload.boardIndex;
      const board = action.payload.board;
      const boardName = board.boardName;
      const newState = produce(state, (draft) => {
        const columns = board.columns.map((item) => {
          const task = item.old
            ? state[boardIndex].columns.find(
                (columnItem) => columnItem.container === item.old
              )!.task
            : [];
          return {
            container: item.new,
            task,
          };
        });

        draft[boardIndex].name = boardName;
        draft[boardIndex].columns = columns;
      });
      return newState;
    },
  },
});

function selectTaskByID(state: Board[], id: string, boardIndex: number) {
  for (const item of state[boardIndex].columns) {
    let find = item.task.find((value) => {
      return value.id === id;
    });

    if (find) {
      return find;
    }
  }
}

export const selectTask = createSelector(
  [
    (state: Board[]) => state,
    (state: Board[], id: string) => id,
    (state: Board[], id: string, boardIndex: number) => boardIndex,
  ],
  (state, id, boardIndex) => selectTaskByID(state, id, boardIndex)
);

export const {
  onHandleDragOver,
  onHandleDragEnd,
  onClickSubtasks,
  onDeleteTask,
  onChangeStatus,
  addNewTask,
  onEditTask,
  onDeleteBoard,
  onEditBoard,
  onAddNewBoard,
} = boardSlice.actions;

export default boardSlice.reducer;
