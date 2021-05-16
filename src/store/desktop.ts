import { DesktopApp } from "@/lib/desktop/desktop";
import { createSlice } from "@reduxjs/toolkit";

export type AppMenuState =
  | {
      isActive: false;
    }
  | {
      isActive: true;
      activeApp: DesktopApp;
    };

type State = {
  activeDesktopApp: DesktopApp;
  focusedDesktopApp: DesktopApp;
  appMenu: AppMenuState;
};

export type SetActiveDesktopAppAction = {
  type: string;
  payload: DesktopApp;
};

export type SetFocusedDesktopAppAction = {
  type: string;
  payload: DesktopApp;
};

export type EnableAppMenuAction = {
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
  enableAppMenu: (state: State, action: EnableAppMenuAction) => void;
  disableAppMenu: (state: State) => void;
};

const desktopSlice = createSlice<State, Action, "desktop">({
  name: "desktop",
  initialState: {
    activeDesktopApp: "DesktopMainView",
    focusedDesktopApp: "DesktopMainView",
    appMenu: {
      isActive: false,
    },
  },
  reducers: {
    setActiveDesktopApp: (state: State, action: SetActiveDesktopAppAction) => {
      state.activeDesktopApp = action.payload;
    },
    setFocusedDesktopApp: (
      state: State,
      action: SetFocusedDesktopAppAction
    ) => {
      state.focusedDesktopApp = action.payload;
    },
    enableAppMenu: (state: State, action: EnableAppMenuAction) => {
      state.appMenu = {
        isActive: true,
        activeApp: action.payload,
      };
    },
    disableAppMenu: (state: State) => {
      state.appMenu = {
        isActive: false,
      };
    },
  },
});

export const {
  setActiveDesktopApp,
  setFocusedDesktopApp,
  enableAppMenu,
  disableAppMenu,
} = desktopSlice.actions;

export default desktopSlice.reducer;
