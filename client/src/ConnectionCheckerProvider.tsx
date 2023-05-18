import { type PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";
import { serverReachable } from "@/lib/serverReachable";
import useIsTouchDevice from "@/lib/useIsTouchDevice";
import { setServerReachable } from "@/store/connection";

export default function ConnectionCheckerProvider({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  const dispatch = useDispatch();
  const isTouchDevice = useIsTouchDevice();

  useEffect(() => {
    const intervalID = !isTouchDevice
      ? window.setInterval(() => {
          const isServerReachable = serverReachable();
          dispatch(setServerReachable(isServerReachable));
        }, 5000)
      : undefined;

    return () => {
      window.clearInterval(intervalID);
    };
  }, [dispatch, isTouchDevice]);

  return <>{children}</>;
}
