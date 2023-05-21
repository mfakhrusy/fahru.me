import { Flex } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DesktopIcon } from "@/components/desktop/DesktopIcon";
import {
  type App,
  makeLocalApps,
  makeMarkdownBasedApps,
} from "@/lib/apps/apps";
import type { RootState } from "@/store";
import {
  SetActiveDesktopAppAction,
  setActiveDesktopApp as setActiveDesktopAppAction,
} from "@/store/desktop";

export function DesktopTouchView() {
  const dispatch = useDispatch();
  const setActiveDesktopApp = useCallback<
    (args: App) => SetActiveDesktopAppAction
  >((payload) => dispatch(setActiveDesktopAppAction(payload)), [dispatch]);

  const activeApp = useSelector<RootState, App>(
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
        {makeLocalApps().map((desktopIcon) => (
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
        {makeMarkdownBasedApps().map((desktopIcon) => (
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
