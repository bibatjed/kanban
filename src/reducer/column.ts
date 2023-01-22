import {
  AnyAction,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import uuid from "react-uuid";
// Define a type for the slice state
import { Task } from "../components/TaskModal/hooks/useTask";
import produce from "immer";
import { RootState } from "../store";
import { useAppSelector } from "../hooks/redux";

export type ContainerState = {
  container: string;
  task: Task[];
};
const initialState: ContainerState[] = [
  {
    container: "todo",
    task: [
      {
        id: uuid(),
        title: "example",
        description: "example",
        subtasks: [{ name: "example", done: false }],
        status: "todo",
        subtaskComplete: 0,
      },
      {
        id: uuid(),
        title: "example1",
        description: "example",
        subtasks: [{ name: "example", done: false }],
        status: "todo",
        subtaskComplete: 0,
      },
      {
        id: uuid(),
        title: "example2",
        description: "example",
        subtasks: [{ name: "example", done: false }],
        status: "todo",
        subtaskComplete: 0,
      },
      {
        id: uuid(),
        title: "example3",
        description: "example",
        subtasks: [{ name: "example", done: false }],
        status: "todo",
        subtaskComplete: 0,
      },
    ],
  },
  {
    container: "doing",
    task: [],
  },
  { container: "done", task: [] },
];
// Define the initial state using that type

export const containerSlice = createSlice({
  name: "container",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateBoard: (state, action: PayloadAction<ContainerState[]>) => {
      return action.payload;
    },
    addNewTask: (state, action: PayloadAction<Task>) => {
      const statusIndex = state.findIndex(
        (item) => item.container === action.payload.status
      );
      const newState = produce(state, (draft) => {
        draft[statusIndex].task.push(action.payload);
      });

      return newState;
    },
    onClickSubtasks: (state, action: PayloadAction<AnyAction>) => {
      let counter = 0;
      let found: number | null = null;
      while (counter < state.length) {
        let find = state[counter].task.findIndex((value) => {
          return value.id === action.payload.id;
        });

        if (find > -1) {
          found = find;
          break;
        }

        counter++;
      }

      const newState = produce(state, (draft) => {
        const currentStatus =
          draft[counter].task[found as number].subtasks[
            action.payload.subtaskIdx
          ].done;

        if (currentStatus) {
          draft[counter].task[found as number].subtaskComplete -= 1;
          draft[counter].task[found as number].subtasks[
            action.payload.subtaskIdx
          ].done = false;
          return;
        }

        draft[counter].task[found as number].subtaskComplete += 1;
        draft[counter].task[found as number].subtasks[
          action.payload.subtaskIdx
        ].done = true;
      });

      return newState;
    },
    onChangeStatus: (state, action: PayloadAction<AnyAction>) => {
      const newState = produce(state, (draft) => {
        let oldStatusContainerIndex: number | null = null;
        let taskIndex: number | null = null;
        for (let [key, item] of state.entries()) {
          const findTaskIndex = item.task.findIndex(
            (value) => value.id === action.payload.id
          );

          if (findTaskIndex > -1) {
            taskIndex = findTaskIndex;
            oldStatusContainerIndex = key;
            break;
          }
        }

        const newStatusContainerIndex = draft.findIndex(
          (value) => value.container === action.payload.status
        );
        const task: Task = draft[oldStatusContainerIndex as number].task.splice(
          taskIndex as number,
          1
        )[0];

        task.status = action.payload.status;
        draft[newStatusContainerIndex].task.push(task);
      });

      return newState;
    },
    onEditTask: (state, action: PayloadAction<Task>) => {
      const newState = produce(state, (draft) => {
        let oldStatusContainerIndex: number | null = null;
        let taskIndex: number | null = null;
        for (let [key, item] of state.entries()) {
          const findTaskIndex = item.task.findIndex(
            (value) => value.id === action.payload.id
          );

          if (findTaskIndex > -1) {
            const originalStatus = draft[key].task[findTaskIndex].status;
            const newStatus = action.payload.status;
            if (originalStatus === newStatus) {
              draft[key].task[findTaskIndex] = { ...action.payload };
              return;
            }
            taskIndex = findTaskIndex;
            oldStatusContainerIndex = key;
            break;
          }
        }

        const newStatusContainerIndex = draft.findIndex(
          (value) => value.container === action.payload.status
        );
        let task: Task = draft[oldStatusContainerIndex as number].task.splice(
          taskIndex as number,
          1
        )[0];

        task = { ...action.payload };

        draft[newStatusContainerIndex].task.push(task);
      });
      return newState;
    },
    onDeleteTask: (state, action: PayloadAction<AnyAction>) => {
      const newState = produce(state, (draft) => {
        for (let [key, item] of draft.entries()) {
          const findTaskIndex = item.task.findIndex(
            (value) => value.id === action.payload.id
          );
          if (findTaskIndex > -1) {
            draft[key].task.splice(findTaskIndex, 1);
            break;
          }
        }
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
} = containerSlice.actions;

function selectTaskByID(state: ContainerState[], id: string) {
  console.log("calling");
  let counter = 0;
  let found: Task | null = null;
  while (counter < state.length) {
    let find = state[counter].task.find((value) => {
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
    (state: ContainerState[]) => state,
    (state: ContainerState[], id: string) => id,
  ],
  (state, id) => selectTaskByID(state, id)
);

export default containerSlice.reducer;
