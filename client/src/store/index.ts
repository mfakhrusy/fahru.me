import { combineReducers, configureStore } from "@reduxjs/toolkit";
import connectionReducer from "./connection";
import desktopReducer from "./desktop";
import taskbarReducer from "./taskbar";
import guestbookReducer from "./guestbook";

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
