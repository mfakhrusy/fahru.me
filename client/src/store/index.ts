import { combineReducers, configureStore } from "@reduxjs/toolkit";
import connectionReducer from "./connection";
import desktopReducer from "./desktop";
import taskbarReducer from "./taskbar";

const rootReducer = combineReducers({
  connection: connectionReducer,
  desktop: desktopReducer,
  taskbar: taskbarReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
