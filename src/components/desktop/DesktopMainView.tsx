import { DesktopApp, makeDesktopIcons } from "@/lib/desktop/desktop";
import { RootState } from "@/store";
import {
  SetActiveDesktopAppAction,
  SetFocusedDesktopAppAction,
  setActiveDesktopApp as setActiveDesktopAppAction,
  setFocusedDesktopApp as setFocusedDesktopAppAction,
} from "@/store/desktop";
import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DesktopIcon } from "./DesktopIcon";

export function DesktopMainView() {
  const dragConstraintRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const focusedApp = useSelector<RootState, DesktopApp>(
    (state) => state.desktop.activeDesktopApp
  );
  const setFocusedDesktopApp = useCallback<
    (args: DesktopApp) => SetFocusedDesktopAppAction
  >((payload) => dispatch(setFocusedDesktopAppAction(payload)), []);
  const setActiveDesktopApp = useCallback<
    (args: DesktopApp) => SetActiveDesktopAppAction
  >((payload) => dispatch(setActiveDesktopAppAction(payload)), []);

  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      if (focusedApp !== "DesktopMainView" && event.key === "Enter") {
        setActiveDesktopApp(focusedApp);
      }
    };

    window.addEventListener("keydown", eventHandler);

    return () => window.removeEventListener("keydown", eventHandler);
  }, [focusedApp]);

  console.log(focusedApp, "esss");

  return (
    <Flex
      flexGrow={1}
      bgColor="aliceblue"
      backgroundImage="url(/images/debian-nyaa.png)"
      backgroundRepeat="no-repeat"
      pos="relative"
      backgroundPosition="center center"
    >
      <motion.div
        style={{ width: "100%", height: "100%" }}
        className="drag-area"
        ref={dragConstraintRef}
      >
        {makeDesktopIcons().map((desktopIcon) => (
          <DesktopIcon
            key={`mainview-${desktopIcon.appName}`}
            iconName={desktopIcon.iconName}
            dragConstraintRef={dragConstraintRef}
            onClick={() => setFocusedDesktopApp(desktopIcon.appName)}
            onDoubleClick={() => setActiveDesktopApp(desktopIcon.appName)}
            isActive={focusedApp === desktopIcon.appName}
            title={desktopIcon.title}
          />
        ))}
      </motion.div>
    </Flex>
  );
}
