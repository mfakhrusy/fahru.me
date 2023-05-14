import { Flex } from "@chakra-ui/layout";
import { BackgroundProps } from "@chakra-ui/styled-system";
import { PropsWithChildren, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppWindowLayoutContent } from "@/components/desktop/apps/layout/AppWindowLayoutContent";
import zIndex from "@/lib/zIndex";
import { RootState } from "@/store";
import {
  SetActiveAppFullScreen,
  setActiveAppFullScreen,
} from "@/store/desktop";

type AppWindowLayoutFullscreenProps = {
  title: string;
  bgColor?: BackgroundProps["bgColor"];
  onClose: () => void;
  noPadding?: boolean;
};

export function AppWindowLayoutFullscreen({
  children,
  bgColor,
  title,
  onClose,
  noPadding = false,
}: PropsWithChildren<AppWindowLayoutFullscreenProps>) {
  const dispatch = useDispatch();

  const isFullScreen = useSelector<RootState, boolean>(
    (state) => state.desktop.isActiveAppFullScreen
  );

  const setFullScreen = useCallback<(args: boolean) => SetActiveAppFullScreen>(
    (payload) => dispatch(setActiveAppFullScreen(payload)),
    [dispatch]
  );

  return (
    <Flex
      w="100vw"
      h="100vh"
      pos="absolute"
      top="33.3%"
      left="33.3%"
      zIndex={zIndex.fullScreenAppWindow}
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
    </Flex>
  );
}
