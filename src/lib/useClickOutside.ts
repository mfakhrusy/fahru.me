import { useEffect } from "react";

type Config = {
  targetRef: any;
  fn: any;
  exceptionRef?: any;
};

export default function useClickOutside({
  targetRef,
  fn,
  exceptionRef,
}: Config) {
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
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
}
