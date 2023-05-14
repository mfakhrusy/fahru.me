import { BackgroundProps } from "@chakra-ui/styled-system";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { type MutableRefObject, PropsWithChildren, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppWindowLayoutContent } from "@/components/desktop/apps/layout/AppWindowLayoutContent";
import { AppWindowLayoutFullscreen } from "@/components/desktop/apps/layout/AppWindowLayoutFullscreen";
import zIndex from "@/lib/zIndex";
import { RootState } from "@/store";
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
  margin-top: 100vh;
  margin-left: 103vw;
`;

type AppWindowLayoutProps = {
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
  title: string;
  bgColor?: BackgroundProps["bgColor"];
  onClose: () => void;
  noPadding?: boolean;
};

export function AppWindowLayout({
  dragConstraintRef,
  children,
  bgColor,
  title,
  onClose,
  noPadding = false,
}: PropsWithChildren<AppWindowLayoutProps>) {
  const isDraggable = dragConstraintRef ? true : false;
  const dispatch = useDispatch();

  const isFullScreen = useSelector<RootState, boolean>(
    (state) => state.desktop.isActiveAppFullScreen
  );

  const setFullScreen = useCallback<(args: boolean) => SetActiveAppFullScreen>(
    (payload) => dispatch(setActiveAppFullScreen(payload)),
    [dispatch]
  );

  if (isFullScreen) {
    return (
      <AppWindowLayoutFullscreen
        title={title}
        bgColor={bgColor}
        onClose={onClose}
      />
    );
  } else {
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
      >
        <AppWindowLayoutContent
          isFullScreen={isFullScreen}
          title={title}
          bgColor={bgColor}
          noPadding={noPadding}
          onClickClose={onClose}
          onClickFullscreen={setFullScreen}
        >
          {children}
        </AppWindowLayoutContent>
      </Container>
    );
  }
}
