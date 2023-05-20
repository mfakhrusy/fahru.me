import { Flex } from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskbarAppMenu } from "@/components/desktop/taskbar/TaskbarAppMenu";
import { TaskbarAppMenuButton } from "@/components/desktop/taskbar/TaskbarAppMenuButton";
import { TaskbarAppSimpleClock } from "@/components/desktop/taskbar/TaskbarAppSimpleClock";
import { TaskbarTimeWidget } from "@/components/desktop/taskbar/TaskbarTimeWidget";
import { TaskbarWifiIcon } from "@/components/desktop/taskbar/TaskbarWifiIcon";
import height from "@/lib/height";
import useClickOutside from "@/lib/useClickOutside";
import zIndex from "@/lib/zIndex";
import type { RootState } from "@/store";
import {
  disableAppMenu as disableAppMenuAction,
  type AppMenuState,
  SetTimeWidgetActive,
  setTimeWidgetActive,
} from "@/store/desktop";

export function Taskbar() {
  const dispatch = useDispatch();

  const appMenuState = useSelector<RootState, AppMenuState>(
    (state) => state.desktop.appMenu
  );

  const disableAppMenu = useCallback<() => void>(
    () => dispatch(disableAppMenuAction()),
    [dispatch]
  );

  const appMenuRef = useRef<HTMLDivElement>(null);
  const appMenuButtonRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    targetRef: appMenuRef,
    fn: () => {
      disableAppMenu();
    },
    exceptionRef: appMenuButtonRef,
  });

  const timeWidgetRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const setTimeWidget = useCallback<(args: boolean) => SetTimeWidgetActive>(
    (payload) => dispatch(setTimeWidgetActive(payload)),
    [dispatch]
  );

  useClickOutside({
    targetRef: timeWidgetRef,
    fn: () => {
      setTimeWidget(false);
    },
    exceptionRef: clockRef,
  });

  return (
    <>
      <Flex
        h={height.taskbar}
        w="100%"
        bgColor="debian.500"
        color="white"
        borderBottom="1px solid rgba(0, 0, 0, 0.1)"
        zIndex={zIndex.taskbar}
        pos="relative"
      >
        <TaskbarAppMenuButton forwardRef={appMenuButtonRef} />
        <TaskbarWifiIcon />
        <TaskbarAppSimpleClock forwardRef={clockRef} />
      </Flex>
      <TaskbarAppMenu
        isActive={appMenuState.isActive}
        forwardRef={appMenuRef}
      />
      <TaskbarTimeWidget forwardRef={timeWidgetRef} />
    </>
  );
}
