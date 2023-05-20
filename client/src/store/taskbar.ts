import { createSlice } from "@reduxjs/toolkit";

type TaskbarMenu = "AppMenu" | "TimeWidget" | "WifiIcon";

export type TaskbarState = {
  taskbarMenu?: TaskbarMenu;
};

export type SetTaskbarMenuAction = {
  type: string;
  payload: TaskbarMenu;
};

type Action = {
  setTaskbarMenu: (state: TaskbarState, action: SetTaskbarMenuAction) => void;
};

const taskbarSlice = createSlice<TaskbarState, Action, "taskbar">({
  name: "taskbar",
  initialState: {
    taskbarMenu: undefined,
  },
  reducers: {
    setTaskbarMenu: (state: TaskbarState, action: SetTaskbarMenuAction) => {
      state.taskbarMenu = action.payload;
    },
  },
});

export const { setTaskbarMenu } = taskbarSlice.actions;

export default taskbarSlice.reducer;
