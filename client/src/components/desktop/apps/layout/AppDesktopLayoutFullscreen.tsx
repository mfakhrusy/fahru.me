import { Flex } from "@chakra-ui/layout";
import type { BackgroundProps } from "@chakra-ui/styled-system";
import { type PropsWithChildren, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDesktopLayoutContent } from "@/components/desktop/apps/layout/AppDesktopLayoutContent";
import zIndex from "@/lib/zIndex";
import {
  SetActiveAppFullScreen,
  setActiveAppFullScreen,
} from "@/store/desktop";

type AppDesktopLayoutFullscreenProps = {
  title: string;
  bgColor?: BackgroundProps["bgColor"];
  onClose: () => void;
  noPadding?: boolean;
};

export function AppDesktopLayoutFullscreen({
  children,
  bgColor,
  title,
  onClose,
  noPadding = false,
}: PropsWithChildren<AppDesktopLayoutFullscreenProps>) {
  const dispatch = useDispatch();

  const setFullScreen = useCallback<(args: boolean) => SetActiveAppFullScreen>(
    (payload) => dispatch(setActiveAppFullScreen(payload)),
    [dispatch]
  );

  return (
    <Flex
      w="100vw"
      h="100vh"
      pos="absolute"
      top="0"
      left="33.3%"
      zIndex={zIndex.fullScreenAppWindow}
    >
      <AppDesktopLayoutContent
        isFullScreen
        title={title}
        bgColor={bgColor}
        noPadding={noPadding}
        onClickClose={onClose}
        onClickFullscreen={setFullScreen}
      >
        {children}
      </AppDesktopLayoutContent>
    </Flex>
  );
}
