import { configureStore } from "@reduxjs/toolkit";
import modal from "../reducer/modal";
import container from "../reducer/board";
import sidebar from "../reducer/sidebar";
import boardDetails from "../reducer/boardDetails";
import theme from "../reducer/theme";
// ...

const store = configureStore({
  reducer: {
    themeReducers: theme,
    modalReducers: modal,
    containerReducers: container,
    sidebarReducers: sidebar,
    boardDetailsReducers: boardDetails,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
