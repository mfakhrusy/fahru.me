import { Flex } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DesktopIcon } from "@/components/desktop/DesktopIcon";
import { type DesktopApp, makeDesktopIcons } from "@/lib/desktop/desktop";
import type { RootState } from "@/store";
import {
  SetActiveDesktopAppAction,
  setActiveDesktopApp as setActiveDesktopAppAction,
} from "@/store/desktop";

export function DesktopTouchView() {
  const dispatch = useDispatch();
  const setActiveDesktopApp = useCallback<
    (args: DesktopApp) => SetActiveDesktopAppAction
  >((payload) => dispatch(setActiveDesktopAppAction(payload)), [dispatch]);

  const activeApp = useSelector<RootState, DesktopApp>(
    (state) => state.desktop.activeDesktopApp
  );

  return (
    <Flex
      flexGrow={1}
      bgColor="aliceblue"
      backgroundImage="url(/images/desktop-bg/debian-uwu.png)"
      backgroundRepeat="no-repeat"
      pos="relative"
      backgroundPosition="center"
    >
      <Flex flexWrap="wrap" h="30%">
        {makeDesktopIcons().map((desktopIcon) => (
          <React.Fragment key={`touchview-${desktopIcon.appName}`}>
            <DesktopIcon
              key={`touchview-${desktopIcon.appName}`}
              iconName={desktopIcon.iconName}
              onClick={() => setActiveDesktopApp(desktopIcon.appName)}
              title={desktopIcon.title}
            />
            {activeApp === desktopIcon.appName ? desktopIcon.component : null}
          </React.Fragment>
        ))}
      </Flex>
    </Flex>
  );
}
