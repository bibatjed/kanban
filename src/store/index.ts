import { configureStore } from "@reduxjs/toolkit";
import modal from "../reducer/modal";
import container from "../reducer/column";
// ...

const store = configureStore({
  reducer: {
    modalReducers: modal,
    containerReducers: container,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
