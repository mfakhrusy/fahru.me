import { createSlice } from "@reduxjs/toolkit";

type State = {
  serverReachable: boolean;
};

export type SetServerReachableAction = {
  type: string;
  payload: boolean;
};

type Action = {
  setServerReachable: (state: State, action: SetServerReachableAction) => void;
};

const desktopSlice = createSlice<State, Action, "connection">({
  name: "connection",
  initialState: {
    serverReachable: true,
  },
  reducers: {
    setServerReachable: (state: State, action: SetServerReachableAction) => {
      state.serverReachable = action.payload;
    },
  },
});

export const { setServerReachable } = desktopSlice.actions;

export default desktopSlice.reducer;
