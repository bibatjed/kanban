import {
  AnyAction,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import uuid from 'react-uuid';
// Define a type for the slice state
import { Task } from '../components/TaskModal/hooks/useTask';
import produce from 'immer';
import { BoardFormValues } from '../components/BoardModal/hooks/useBoardModal';

export type ContainerState = {
  container: string;
  task: Task[];
};

export type Board = {
  name: string;
  columns: ContainerState[];
};

//TODO: RESOLVE TYPE ISSUES

const initialState: Board[] = [
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
];
// Define the initial state using that type

export const boardSlice = createSlice({
  name: 'container',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateBoard: (
      state,
      action: PayloadAction<{ column: ContainerState[]; boardIndex: number }>
    ) => {
      const newState = produce(state, (draft) => {
        draft[0].columns = action.payload.column;
      });
      return newState;
    },
    addNewTask: (
      state,
      action: PayloadAction<{ task: Task; boardIndex: number }>
    ) => {
      const boardIndex = action.payload.boardIndex;
      const statusIndex = state[boardIndex].columns.findIndex(
        (item) => item.container === action.payload.task.status
      );
      const newState = produce(state, (draft) => {
        draft[boardIndex].columns[statusIndex].task.push(action.payload.task);
      });

      return newState;
    },
    onClickSubtasks: (state, action: PayloadAction<AnyAction>) => {
      let counter = 0;
      let found: number | null = null;
      const boardIndex = action.payload.boardIndex;
      while (counter < state[boardIndex].columns.length) {
        let find = state[boardIndex].columns[counter].task.findIndex(
          (value) => {
            return value.id === action.payload.id;
          }
        );

        if (find > -1) {
          found = find;
          break;
        }

        counter++;
      }

      const newState = produce(state, (draft) => {
        const currentStatus =
          draft[boardIndex].columns[counter].task[found as number].subtasks[
            action.payload.subtaskIdx
          ].done;

        if (currentStatus) {
          draft[boardIndex].columns[counter].task[
            found as number
          ].subtaskComplete -= 1;
          draft[boardIndex].columns[counter].task[found as number].subtasks[
            action.payload.subtaskIdx
          ].done = false;
          return;
        }

        draft[boardIndex].columns[counter].task[
          found as number
        ].subtaskComplete += 1;
        draft[boardIndex].columns[counter].task[found as number].subtasks[
          action.payload.subtaskIdx
        ].done = true;
      });

      return newState;
    },
    onChangeStatus: (state, action: PayloadAction<AnyAction>) => {
      const newState = produce(state, (draft) => {
        let oldStatusContainerIndex: number | null = null;
        let taskIndex: number | null = null;
        const boardIndex = action.payload.boardIndex;
        for (let [key, item] of state[boardIndex].columns.entries()) {
          const findTaskIndex = item.task.findIndex(
            (value) => value.id === action.payload.id
          );

          if (findTaskIndex > -1) {
            taskIndex = findTaskIndex;
            oldStatusContainerIndex = key;
            break;
          }
        }

        const newStatusContainerIndex = draft[boardIndex].columns.findIndex(
          (value) => value.container === action.payload.status
        );
        const task: Task = draft[boardIndex].columns[
          oldStatusContainerIndex as number
        ].task.splice(taskIndex as number, 1)[0];

        task.status = action.payload.status;
        draft[boardIndex].columns[newStatusContainerIndex].task.push(task);
      });

      return newState;
    },
    onEditTask: (
      state,
      action: PayloadAction<{ task: Task; boardIndex: number }>
    ) => {
      const boardIndex = action.payload.boardIndex;
      const newState = produce(state, (draft) => {
        let oldStatusContainerIndex: number | null = null;
        let taskIndex: number | null = null;
        for (let [key, item] of state[boardIndex].columns.entries()) {
          const findTaskIndex = item.task.findIndex(
            (value) => value.id === action.payload.task.id
          );

          if (findTaskIndex > -1) {
            const originalStatus =
              draft[boardIndex].columns[key].task[findTaskIndex].status;
            const newStatus = action.payload.task.status;
            if (originalStatus === newStatus) {
              draft[boardIndex].columns[key].task[findTaskIndex] = {
                ...action.payload.task,
              };
              return;
            }
            taskIndex = findTaskIndex;
            oldStatusContainerIndex = key;
            break;
          }
        }

        const newStatusContainerIndex = draft[boardIndex].columns.findIndex(
          (value) => value.container === action.payload.task.status
        );
        let task: Task = draft[boardIndex].columns[
          oldStatusContainerIndex as number
        ].task.splice(taskIndex as number, 1)[0];

        task = { ...action.payload.task };

        draft[boardIndex].columns[newStatusContainerIndex].task.push(task);
      });
      return newState;
    },
    onDeleteTask: (state, action: PayloadAction<AnyAction>) => {
      const boardIndex = action.payload.boardIndex;
      const newState = produce(state, (draft) => {
        for (let [key, item] of draft[boardIndex].columns.entries()) {
          const findTaskIndex = item.task.findIndex(
            (value) => value.id === action.payload.id
          );
          if (findTaskIndex > -1) {
            draft[boardIndex].columns[key].task.splice(findTaskIndex, 1);
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
      const newState = produce(state, (draft) => {
        const columns = action.payload.board.columns.map((item) => {
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

        draft[boardIndex].name = action.payload.board.boardName;
        draft[boardIndex].columns = columns;
      });
      return newState;
    },
  },
});

export const {
  updateBoard,
  onClickSubtasks,
  onDeleteTask,
  onChangeStatus,
  addNewTask,
  onEditTask,
  onDeleteBoard,
  onEditBoard,
  onAddNewBoard,
} = boardSlice.actions;

function selectTaskByID(state: Board[], id: string, boardIndex: number) {
  let counter = 0;
  let found: Task | null = null;
  while (counter < state[boardIndex]?.columns.length) {
    let find = state[boardIndex].columns[counter].task.find((value) => {
      return value.id === id;
    });

    if (find) {
      found = find;
      break;
    }

    counter++;
  }

  return found;
}

export const selectTask = createSelector(
  [
    (state: Board[]) => state,
    (state: Board[], id: string) => id,
    (state: Board[], id: string, boardIndex: number) => boardIndex,
  ],
  (state, id, boardIndex) => selectTaskByID(state, id, boardIndex)
);

export default boardSlice.reducer;
