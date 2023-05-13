import { Flex } from "@chakra-ui/react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppContent } from "@/components/desktop/apps/AppContent";
import { DesktopIcon } from "@/components/desktop/DesktopIcon";
import { DesktopApp, makeDesktopIcons } from "@/lib/desktop/desktop";
import {
  SetActiveDesktopAppAction,
  setActiveDesktopApp as setActiveDesktopAppAction,
} from "@/store/desktop";

export function DesktopTouchView() {
  const dispatch = useDispatch();
  const setActiveDesktopApp = useCallback<
    (args: DesktopApp) => SetActiveDesktopAppAction
  >((payload) => dispatch(setActiveDesktopAppAction(payload)), [dispatch]);

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
          <DesktopIcon
            key={`touchview-${desktopIcon.appName}`}
            iconName={desktopIcon.iconName}
            onClick={() => setActiveDesktopApp(desktopIcon.appName)}
            title={desktopIcon.title}
          />
        ))}
      </Flex>
      <AppContent />
    </Flex>
  );
}
