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
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DesktopIcon } from "./DesktopIcon";
import styled from "@emotion/styled";

const DragArea = styled(motion.div)`
  width: 100%;
  height: 200%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  position: absolute;
`;

type Props = {
  renderActiveApp: (
    dragConstraintRef: MutableRefObject<HTMLDivElement>
  ) => React.ReactNode;
};

export function DesktopMainView({ renderActiveApp }: Props) {
  const dragConstraintRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const focusedApp = useSelector<RootState, DesktopApp>(
    (state) => state.desktop.focusedDesktopApp
  );

  const setFocusedDesktopApp = useCallback<
    (args: DesktopApp) => SetFocusedDesktopAppAction
  >((payload) => dispatch(setFocusedDesktopAppAction(payload)), []);

  const setActiveDesktopApp = useCallback<
    (args: DesktopApp) => SetActiveDesktopAppAction
  >((payload) => dispatch(setActiveDesktopAppAction(payload)), []);

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
  }, [focusedApp]);

  return (
    <Flex
      flexGrow={1}
      backgroundImage="url(/images/debian-nyaa.png)"
      backgroundRepeat="no-repeat"
      pos="relative"
      backgroundPosition="center"
    >
      <DragArea className="drag-area" ref={dragConstraintRef}>
        {renderActiveApp(dragConstraintRef)}
        <Flex
          pos="absolute"
          top="0"
          left="0"
          flexDir="column"
          alignItems="flex-end"
          w="100%"
        >
          {makeDesktopIcons().map((desktopIcon) => (
            <DesktopIcon
              key={`mainview-${desktopIcon.appName}`}
              iconName={desktopIcon.iconName}
              dragConstraintRef={dragConstraintRef}
              onClick={() => setFocusedDesktopApp(desktopIcon.appName)}
              onDoubleClick={() => setActiveDesktopApp(desktopIcon.appName)}
              isFocused={focusedApp === desktopIcon.appName}
              title={desktopIcon.title}
            />
          ))}
        </Flex>
      </DragArea>
    </Flex>
  );
}
