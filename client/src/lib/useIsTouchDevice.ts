// https://stackoverflow.com/a/61519537/5835100

import { useEffect, useState } from "react";

function isTouchDevice() {
  if (typeof window === "undefined") return false;

  const prefixes = " -webkit- -mox- -o- -ms- ".split(" ");
  function mq(query) {
    return typeof window !== "undefined" && window.matchMedia(query).matches;
  }

  if (
    "ontouchstart" in window ||
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (window?.DocumentTouch && document instanceof DocumentTouch)
  )
    return true;

  const query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(
    ""
  );

  return mq(query);
}

export default function useIsTouchDevice() {
  const isTouchLS =
    typeof window === "undefined"
      ? null
      : localStorage.getItem("isTouchDevice");
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (isTouchLS === "" || isTouchLS === null) {
      const {
        isAndroid,
        isIPad13,
        isIPhone13,
        isWinPhone,
        isMobileSafari,
        isTablet,
        // eslint-disable-next-line @typescript-eslint/no-var-requires
      } = require("react-device-detect");
      const newIsTouch =
        isAndroid ||
        isIPad13 ||
        isIPhone13 ||
        isWinPhone ||
        isMobileSafari ||
        isTablet ||
        isTouchDevice();
      setIsTouch(newIsTouch);

      localStorage.setItem("isTouchDevice", newIsTouch);
    }
  }, [isTouch, isTouchLS]);

  if (isTouchLS === "" || isTouchLS === null) {
    return isTouch;
  } else {
    if (isTouchLS === "false") {
      return false;
    } else {
      return true;
    }
  }
}
