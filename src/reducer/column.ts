import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";
// Define a type for the slice state
import { Task } from "../components/TaskModal";
import produce from "immer";

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
  },
});

export const { updateBoard, addNewTask } = containerSlice.actions;
export default containerSlice.reducer;
