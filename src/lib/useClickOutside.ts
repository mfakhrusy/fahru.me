import { RefObject, useEffect } from "react";

type Config<T> = {
  targetRef: RefObject<T>;
  fn: () => void;
  exceptionRef?: RefObject<T>;
};

export default function useClickOutside<T extends HTMLElement>({
  targetRef,
  fn,
  exceptionRef,
}: Config<T>) {
  const handleClick = (e: MouseEvent) => {
    const evTarget = e.target;

    if (targetRef.current) {
      if (exceptionRef) {
        if (
          !(
            evTarget instanceof Node && exceptionRef.current?.contains(evTarget)
          )
        ) {
          if (
            !(evTarget instanceof Node && targetRef.current.contains(evTarget))
          ) {
            fn();
          }
        }
      } else {
        if (
          !(evTarget instanceof Node && targetRef.current.contains(evTarget))
        ) {
          fn();
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
}
