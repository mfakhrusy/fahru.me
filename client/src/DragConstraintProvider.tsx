import { type PropsWithChildren, useRef } from "react";
import { DragContext } from "@/context/DragContext";

export default function DragConstraintProvider({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  const dragConstraintRef = useRef<HTMLDivElement>(null);

  return (
    <DragContext.Provider value={dragConstraintRef}>
      {children}
    </DragContext.Provider>
  );
}
