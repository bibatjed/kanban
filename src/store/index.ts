import { configureStore } from '@reduxjs/toolkit';
import modal from '../reducer/modal';
import board from '../reducer/board';
import sidebar from '../reducer/sidebar';
import boardDetails from '../reducer/boardDetails';
import theme from '../reducer/theme';
// ...

const store = configureStore({
  reducer: {
    themeReducers: theme,
    modalReducers: modal,
    boardReducers: board,
    sidebarReducers: sidebar,
    boardDetailsReducers: boardDetails,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('modal', JSON.stringify(state.modalReducers));
  localStorage.setItem('board', JSON.stringify(state.boardReducers));
  localStorage.setItem('sidebar', JSON.stringify(state.sidebarReducers));
  localStorage.setItem(
    'boardDetails',
    JSON.stringify(state.boardDetailsReducers)
  );
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
