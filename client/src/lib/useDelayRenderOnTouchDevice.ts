import { useEffect, useState } from "react";
import useIsTouchDevice from "@/lib/useIsTouchDevice";

export type UseDelayRenderConfig = {
  delayAmount: number;
};

export default function useDelayRenderOnTouchDevice({
  delayAmount,
}: UseDelayRenderConfig) {
  const isTouchDevice = useIsTouchDevice();
  const [shouldRenderContent, setshouldRenderContent] = useState(false);

  useEffect(() => {
    if (isTouchDevice) {
      setTimeout(() => setshouldRenderContent(true), delayAmount);
    } else {
      setshouldRenderContent(true);
    }
  }, [delayAmount, isTouchDevice]);

  return shouldRenderContent;
}
