import { BackgroundProps } from "@chakra-ui/styled-system";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import {
  type MutableRefObject,
  type PropsWithChildren,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";
import { AppDesktopLayoutContent } from "@/components/desktop/apps/layout/AppDesktopLayoutContent";
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
  margin-top: 100vh;
  margin-left: 103vw;
`;

type AppDesktopLayoutWindowedProps = {
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
  title: string;
  bgColor?: BackgroundProps["bgColor"];
  onClose: () => void;
  noPadding?: boolean;
};

export function AppDesktopLayoutWindowed({
  dragConstraintRef,
  children,
  bgColor,
  title,
  onClose,
  noPadding = false,
}: PropsWithChildren<AppDesktopLayoutWindowedProps>) {
  const isDraggable = dragConstraintRef ? true : false;
  const dispatch = useDispatch();

  const setFullScreen = useCallback<(args: boolean) => SetActiveAppFullScreen>(
    (payload) => dispatch(setActiveAppFullScreen(payload)),
    [dispatch]
  );

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
      <AppDesktopLayoutContent
        isFullScreen={false}
        title={title}
        bgColor={bgColor}
        noPadding={noPadding}
        onClickClose={onClose}
        onClickFullscreen={setFullScreen}
      >
        {children}
      </AppDesktopLayoutContent>
    </Container>
  );
}
