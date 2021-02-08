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
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const {
      isAndroid,
      isIPad13,
      isIPhone13,
      isWinPhone,
      isMobileSafari,
      isTablet,
    } = require("react-device-detect");
    setIsTouch(
      isAndroid ||
        isIPad13 ||
        isIPhone13 ||
        isWinPhone ||
        isMobileSafari ||
        isTablet ||
        isTouchDevice()
    );
  }, []);

  return isTouch;
}
