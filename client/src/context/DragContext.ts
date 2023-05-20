import React, { createContext } from "react";

export const DragContext =
  createContext<React.MutableRefObject<HTMLDivElement>>(null);
