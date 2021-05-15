import { DesktopApp } from "@/lib/desktop/desktop";
import { createSlice, Slice } from "@reduxjs/toolkit";

type State = {
  activeDesktopApp: DesktopApp;
  focusedDesktopApp: DesktopApp;
};

export type SetActiveDesktopAppAction = {
  type: string;
  payload: DesktopApp;
};

export type SetFocusedDesktopAppAction = {
  type: string;
  payload: DesktopApp;
};

type Action = {
  setActiveDesktopApp: (
    state: State,
    action: SetActiveDesktopAppAction
  ) => void;
  setFocusedDesktopApp: (
    state: State,
    action: SetFocusedDesktopAppAction
  ) => void;
};

const desktopSlice = createSlice<State, Action, "desktop">({
  name: "desktop",
  initialState: {
    activeDesktopApp: "DesktopMainView",
    focusedDesktopApp: "DesktopMainView",
  },
  reducers: {
    setActiveDesktopApp(state: State, action: SetActiveDesktopAppAction) {
      state.activeDesktopApp = action.payload;
    },
    setFocusedDesktopApp(state, action) {
      console.log("focused", state, action);
      state.focusedDesktopApp = action.payload;
    },
  },
});

export const { setActiveDesktopApp, setFocusedDesktopApp } =
  desktopSlice.actions;

export default desktopSlice.reducer;
