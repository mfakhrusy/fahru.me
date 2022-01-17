import { AppLayout } from "@/components/desktop/apps/AppLayout";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";
import { RootState } from "@/store";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { MutableRefObject, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export function AppBlog({ onClose, isOpen, dragConstraintRef }: Props) {
  const shouldRenderContent = useDelayRenderOnTouchDevice({ delayAmount: 150 });
  const [isIntro, setIsIntro] = useState(true);

  return (
    <AppLayout
      title="Blog"
      onClose={onClose}
      isOpen={isOpen}
      dragConstraintRef={dragConstraintRef}
      noPadding
    >
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

  return (
    <Flex
      bgColor="white"
      pos="absolute"
      top="0"
      left="0"
      w="100%"
      h={isFullScreen ? "calc(100vh - 84px)" : "600px"}
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading fontSize="2xl" color="gray.600" mb={8}>
        My Blog
      </Heading>
      <Flex>
        <Button onClick={() => hideIntro()} w="180px" mr={4}>
          Read Here
        </Button>
        <Button
          as="a"
          w="180px"
          display="flex"
          alignItems="center"
          href="https://blog.fakhrusy.com"
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

  return (
    <iframe
      style={{
        width: "100%",
        height: isFullScreen ? "calc(100vh - 84px)" : "600px",
      }}
      src="https://blog.fakhrusy.com"
      title="blog"
    />
  );
}
