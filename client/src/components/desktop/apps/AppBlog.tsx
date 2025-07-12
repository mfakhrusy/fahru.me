import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppLayout } from "@/components/desktop/apps/layout/AppLayout";
import type { App } from "@/lib/apps/apps";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";
import useIsTouchDevice from "@/lib/useIsTouchDevice";
import type { RootState } from "@/store";
import {
  setActiveDesktopApp as setActiveDesktopAppAction,
  SetActiveDesktopAppAction,
} from "@/store/desktop";

export function AppBlog() {
  const dispatch = useDispatch();
  const shouldRenderContent = useDelayRenderOnTouchDevice({ delayAmount: 150 });
  const [isIntro, setIsIntro] = useState(true);
  const setActiveDesktopApp = useCallback<
    (args: App) => SetActiveDesktopAppAction
  >((payload) => dispatch(setActiveDesktopAppAction(payload)), [dispatch]);

  const onClose = () => setActiveDesktopApp("DesktopMainView");

  return (
    <AppLayout title="Blog" onClose={onClose} noPadding>
      {shouldRenderContent && (
        <Flex pos="relative" w="100%">
          <MainView />
          {isIntro ? <IntroView hideIntro={() => setIsIntro(false)} /> : null}
        </Flex>
      )}
    </AppLayout>
  );
}

type IntroViewProps = {
  hideIntro: () => void;
};

function IntroView({ hideIntro }: IntroViewProps) {
  const isFullScreen = useSelector<RootState, boolean>(
    (state) => state.desktop.isActiveAppFullScreen
  );

  const isTouchDevice = useIsTouchDevice();

  let height = "600px";
  if (isFullScreen) {
    height = "calc(100vh - 84px)";
  } else if (isTouchDevice) {
    height = "calc(100vh - 55px)";
  }

  return (
    <Flex
      bgColor="white"
      pos="absolute"
      top="0"
      left="0"
      w="100%"
      h={height}
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading fontSize="2xl" color="gray.600" mb={8}>
        My Blog
      </Heading>
      <Flex>
        <Button
          onClick={() => hideIntro()}
          w={isTouchDevice ? "150px" : "180px"}
          mr={4}
        >
          Read Here
        </Button>
        <Button
          as="a"
          w="180px"
          display="flex"
          alignItems="center"
          href="https://blog.fahru.me"
          target="_blank"
        >
          <Text as="span" mr={2}>
            Open in New Tab
          </Text>
          <ExternalLinkIcon />
        </Button>
      </Flex>
    </Flex>
  );
}

function MainView() {
  const isFullScreen = useSelector<RootState, boolean>(
    (state) => state.desktop.isActiveAppFullScreen
  );

  const isTouchDevice = useIsTouchDevice();

  let height = "600px";
  if (isFullScreen) {
    height = "calc(100vh - 84px)";
  } else if (isTouchDevice) {
    height = "calc(100vh - 55px)";
  }

  return (
    <iframe
      style={{
        width: "100%",
        height,
      }}
      src="https://blog.fahru.me"
      title="blog"
    />
  );
}
