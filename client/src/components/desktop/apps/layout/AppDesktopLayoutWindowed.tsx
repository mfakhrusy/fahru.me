import type { BackgroundProps } from "@chakra-ui/styled-system";
import styled from "@emotion/styled";
import { motion, useDragControls } from "framer-motion";
import {
  type MutableRefObject,
  type PropsWithChildren,
  useCallback,
  useContext,
} from "react";
import { useDispatch } from "react-redux";
import { AppDesktopLayoutContent } from "@/components/desktop/apps/layout/AppDesktopLayoutContent";
import { DragContext } from "@/context/DragContext";
import zIndex from "@/lib/zIndex";
import {
  SetActiveAppFullScreen,
  setActiveAppFullScreen,
} from "@/store/desktop";

const Container = styled(motion.div)`
  height: auto;
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  align-self: flex-start;
  z-index: ${zIndex.draggableAppWindow};
  margin-top: 3vh;
  margin-left: 103vw;
  position: absolute;
  left: 0;
`;

type AppDesktopLayoutWindowedProps = {
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
  title: string;
  bgColor?: BackgroundProps["bgColor"];
  onClose: () => void;
  noPadding?: boolean;
};

export function AppDesktopLayoutWindowed({
  children,
  bgColor,
  title,
  onClose,
  noPadding = false,
}: PropsWithChildren<AppDesktopLayoutWindowedProps>) {
  const dragConstraintRef = useContext(DragContext);
  const dispatch = useDispatch();
  const dragControls = useDragControls();

  const setFullScreen = useCallback<(args: boolean) => SetActiveAppFullScreen>(
    (payload) => dispatch(setActiveAppFullScreen(payload)),
    [dispatch]
  );

  const isDraggable = dragConstraintRef ? true : false;

  return (
    <Container
      dragConstraints={dragConstraintRef}
      drag={isDraggable}
      dragElastic={0}
      dragTransition={{
        bounceStiffness: 0,
        min: 0,
        max: 0,
        power: 0,
        bounceDamping: 0,
      }}
      dragListener={false}
      dragControls={dragControls}
    >
      <AppDesktopLayoutContent
        isFullScreen={false}
        title={title}
        bgColor={bgColor}
        noPadding={noPadding}
        onClickClose={onClose}
        onClickFullscreen={setFullScreen}
        onPointerDown={(e) => {
          dragControls.start(e);
        }}
      >
        {children}
      </AppDesktopLayoutContent>
    </Container>
  );
}
