import { combineReducers, configureStore } from "@reduxjs/toolkit";
import desktopReducer from "./desktop";

const rootReducer = combineReducers({
  desktop: desktopReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
