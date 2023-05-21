import { Box, Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React, { useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DesktopAppContent } from "@/components/desktop/DesktopAppContent";
import { DesktopIcon } from "@/components/desktop/DesktopIcon";
import { DragContext } from "@/context/DragContext";
import { type DesktopApp, makeDesktopIcons } from "@/lib/desktop/desktop";
import type { RootState } from "@/store";
import {
  type SetActiveDesktopAppAction,
  type SetFocusedDesktopAppAction,
  setActiveDesktopApp as setActiveDesktopAppAction,
  setFocusedDesktopApp as setFocusedDesktopAppAction,
} from "@/store/desktop";

const DragArea = styled(motion.div)`
  width: 300%;
  left: -100%;
  height: 200%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  position: absolute;
`;

export const DesktopDragArea = () => {
  const dragConstraintRef = useContext(DragContext);
  const dispatch = useDispatch();

  const focusedApp = useSelector<RootState, DesktopApp>(
    (state) => state.desktop.focusedDesktopApp
  );

  const setFocusedDesktopApp = useCallback<
    (args: DesktopApp) => SetFocusedDesktopAppAction
  >((payload) => dispatch(setFocusedDesktopAppAction(payload)), [dispatch]);

  const setActiveDesktopApp = useCallback<
    (args: DesktopApp) => SetActiveDesktopAppAction
  >((payload) => dispatch(setActiveDesktopAppAction(payload)), [dispatch]);

  return (
    <DragArea className="drag-area" ref={dragConstraintRef}>
      <Flex pos="absolute" top="0" w="100%" paddingLeft="100vw">
        <DesktopAppContent />
        {/* 100vw because drag area extends to left and right side of the visible screen, so we need to add some "left buffer" so desktop icons can appear in the middle */}
        {makeDesktopIcons().map((desktopIcon, i) => (
          <React.Fragment key={`mainview-${desktopIcon.appName}`}>
            <DesktopIcon
              iconName={desktopIcon.iconName}
              dragConstraintRef={dragConstraintRef}
              onClick={() => setFocusedDesktopApp(desktopIcon.appName)}
              onDoubleClick={() => setActiveDesktopApp(desktopIcon.appName)}
              isFocused={focusedApp === desktopIcon.appName}
              title={desktopIcon.title}
            />
            {i !== makeDesktopIcons().length - 1 ? (
              <Box w="15px" h="1px" />
            ) : null}
          </React.Fragment>
        ))}
      </Flex>
    </DragArea>
  );
};
