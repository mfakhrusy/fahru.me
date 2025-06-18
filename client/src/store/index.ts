import { combineReducers, configureStore } from "@reduxjs/toolkit";
import connectionReducer from "./connection";
import desktopReducer from "./desktop";
import guestbookReducer from "./guestbook";
import taskbarReducer from "./taskbar";

const rootReducer = combineReducers({
  connection: connectionReducer,
  desktop: desktopReducer,
  taskbar: taskbarReducer,
  guestbook: guestbookReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
