import { RefObject, useEffect } from "react";

type Config<T> = {
  targetRef: RefObject<T>;
  fn: () => void;
  exceptionRef?: RefObject<T>;
};

export default function useClickOutside<T>({
  targetRef,
  fn,
  exceptionRef,
}: Config<T extends HTMLElement ? T : HTMLElement>) {
  const handleClick = (e) => {
    if (targetRef.current) {
      if (exceptionRef) {
        if (!exceptionRef.current?.contains(e.target)) {
          if (!targetRef.current.contains(e.target)) {
            fn();
          }
        }
      } else {
        if (!targetRef.current.contains(e.target)) {
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
