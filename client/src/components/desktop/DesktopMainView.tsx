import { Flex } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DesktopMainViewModal } from "@/components/desktop/DekstopMainViewModal";
import { DesktopDragArea } from "@/components/desktop/DesktopDragArea";
import { DesktopInfoPopover } from "@/components/desktop/DesktopInfoPopover";
import type { App } from "@/lib/apps/apps";
import className from "@/lib/className";
import type { RootState } from "@/store";
import {
  SetActiveDesktopAppAction,
  SetFocusedDesktopAppAction,
  setActiveDesktopApp as setActiveDesktopAppAction,
  setFocusedDesktopApp as setFocusedDesktopAppAction,
  SetCurrentTime,
  setCurrentTime as setCurrentTimeAction,
} from "@/store/desktop";
import { TaskbarState, setTaskbarMenu } from "@/store/taskbar";

export function DesktopMainView() {
  const dispatch = useDispatch();

  const focusedApp = useSelector<RootState, App>(
    (state) => state.desktop.focusedDesktopApp
  );

  const taskbarMenu = useSelector<RootState, TaskbarState["taskbarMenu"]>(
    (state) => state.taskbar.taskbarMenu
  );

  const setFocusedDesktopApp = useCallback<
    (args: App) => SetFocusedDesktopAppAction
  >((payload) => dispatch(setFocusedDesktopAppAction(payload)), [dispatch]);

  const setActiveDesktopApp = useCallback<
    (args: App) => SetActiveDesktopAppAction
  >((payload) => dispatch(setActiveDesktopAppAction(payload)), [dispatch]);

  const setCurrentTime = useCallback<(currentTime: string) => SetCurrentTime>(
    (payload) => dispatch(setCurrentTimeAction(payload)),
    [dispatch]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 1000);

    return () => clearInterval(interval);
  }, [setCurrentTime]);

  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      if (focusedApp !== "DesktopMainView") {
        // set active app upon pressing enter when there is a focused app
        if (event.key === "Enter") {
          setActiveDesktopApp(focusedApp);
        } else if (event.key === "Escape") {
          // release focused app
          setFocusedDesktopApp("DesktopMainView");
        }
      }
    };

    window.addEventListener("keydown", eventHandler);

    return () => window.removeEventListener("keydown", eventHandler);
  }, [focusedApp, setActiveDesktopApp, setFocusedDesktopApp]);

  const unfocusApp = useCallback(
    (e) => {
      const isFocusedOnAnyApp = focusedApp !== "DesktopMainView";

      if (isFocusedOnAnyApp) {
        const isTargetNotDesktopIcon =
          (e.target as HTMLDivElement)?.className
            .split(" ")
            .includes(className.desktopIcon) === false;

        if (isTargetNotDesktopIcon) {
          setFocusedDesktopApp("DesktopMainView");
        }
      }
    },
    [focusedApp, setFocusedDesktopApp]
  );

  const handleClick = useCallback(
    (e) => {
      unfocusApp(e);
      if (taskbarMenu !== undefined) {
        dispatch(setTaskbarMenu());
      }
    },
    [dispatch, taskbarMenu, unfocusApp]
  );

  return (
    <Flex
      flexGrow={1}
      backgroundImage="url(/images/desktop-bg/debian-uwu.png)"
      backgroundRepeat="repeat"
      pos="relative"
      backgroundPosition="center"
      onClick={handleClick}
    >
      <DesktopDragArea />
      <Flex alignSelf="flex-end" m={4}>
        <DesktopInfoPopover />
      </Flex>
      <DesktopMainViewModal />
    </Flex>
  );
}
