import { DesktopApp, makeDesktopIcons } from "@/lib/desktop/desktop";
import {
  SetActiveDesktopAppAction,
  setActiveDesktopApp as setActiveDesktopAppAction,
} from "@/store/desktop";
import { Flex } from "@chakra-ui/react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { DesktopIcon } from "./DesktopIcon";

export function DesktopTouchView() {
  const dispatch = useDispatch();
  const setActiveDesktopApp = useCallback<
    (args: DesktopApp) => SetActiveDesktopAppAction
  >((payload) => dispatch(setActiveDesktopAppAction(payload)), []);

  return (
    <Flex
      flexGrow={1}
      bgColor="aliceblue"
      backgroundImage="url(/images/debian-nyaa.png)"
      backgroundRepeat="no-repeat"
      pos="relative"
      backgroundPosition="center center"
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
    </Flex>
  );
}
