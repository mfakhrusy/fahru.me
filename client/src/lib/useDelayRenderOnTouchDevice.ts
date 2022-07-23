import useIsTouchDevice from "@/lib/useIsTouchDevice";
import { useEffect, useState } from "react";

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
  }, []);

  return shouldRenderContent;
}
