import { DesktopApp, makeDesktopIcons } from "@/lib/desktop/desktop";
import { RootState } from "@/store";
import {
  SetActiveDesktopAppAction,
  SetFocusedDesktopAppAction,
  setActiveDesktopApp as setActiveDesktopAppAction,
  setFocusedDesktopApp as setFocusedDesktopAppAction,
  ModalState,
  setModal as setModalAction,
  SetModalAction,
  SetCurrentTime,
  setCurrentTime as setCurrentTimeAction,
} from "@/store/desktop";
import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DesktopIcon } from "./DesktopIcon";
import styled from "@emotion/styled";
import { DesktopInfoPopover } from "@/components/desktop/DesktopInfoPopover";
import { DesktopRebootModal } from "@/components/desktop/DesktopRebootModal";
import { DesktopShutdownModal } from "@/components/desktop/DesktopShutdownModal";
import className from "@/lib/className";

const DragArea = styled(motion.div)`
  width: 300%;
  left: -100%;
  height: 300%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  position: absolute;
  top: -100%;
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

  const modal = useSelector<RootState, ModalState>(
    (state) => state.desktop.modal
  );

  const setFocusedDesktopApp = useCallback<
    (args: DesktopApp) => SetFocusedDesktopAppAction
  >((payload) => dispatch(setFocusedDesktopAppAction(payload)), []);

  const setActiveDesktopApp = useCallback<
    (args: DesktopApp) => SetActiveDesktopAppAction
  >((payload) => dispatch(setActiveDesktopAppAction(payload)), []);

  const setModal = useCallback<(args: ModalState) => SetModalAction>(
    (payload) => dispatch(setModalAction(payload)),
    []
  );

  const setCurrentTime = useCallback<(currentTime: string) => SetCurrentTime>(
    (payload) => dispatch(setCurrentTimeAction(payload)),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  const renderModal = (modal: ModalState) => {
    switch (modal) {
      case "rebootModal":
        return (
          <DesktopRebootModal
            onClose={() => setModal("noModal")}
            isOpen={modal === "rebootModal"}
          />
        );
      case "shutdownModal":
        return (
          <DesktopShutdownModal
            onClose={() => setModal("noModal")}
            isOpen={modal === "shutdownModal"}
          />
        );
    }
  };

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
    [focusedApp]
  );

  return (
    <Flex
      flexGrow={1}
      backgroundImage="url(/images/desktop-bg/debian-uwu.png)"
      backgroundRepeat="repeat"
      pos="relative"
      backgroundPosition="center"
      onClick={unfocusApp}
    >
      <DragArea className="drag-area" ref={dragConstraintRef}>
        {renderActiveApp(dragConstraintRef)}
        <Flex pos="absolute" top="33.4%" w="100%">
          {/* 100vw because drag area extends to left and right side of the visible screen, so we need to add some "left buffer" so desktop icons can appear in the middle */}
          <Box w="100vw" h="100px" />
          {makeDesktopIcons().map((desktopIcon, i) => (
            <>
              <DesktopIcon
                key={`mainview-${desktopIcon.appName}`}
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
            </>
          ))}
        </Flex>
      </DragArea>
      <Flex alignSelf="flex-end" m={4}>
        <DesktopInfoPopover />
      </Flex>
      {renderModal(modal)}
    </Flex>
  );
}
