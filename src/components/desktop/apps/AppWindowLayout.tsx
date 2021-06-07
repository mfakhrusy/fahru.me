import { CloseIcon, Icon } from "@chakra-ui/icons";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { BackgroundProps } from "@chakra-ui/styled-system";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { MutableRefObject, PropsWithChildren, useCallback } from "react";
import {
  SetActiveAppFullScreen,
  setActiveAppFullScreen,
} from "@/store/desktop";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import zIndex from "@/lib/zIndex";

const Container = styled(motion.div)`
  height: auto;
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  align-self: flex-start;
  z-index: 100;
  margin-top: 20px;
  margin-left: 250px;
`;

type Props = {
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
}: PropsWithChildren<Props>) {
  const isDraggable = dragConstraintRef ? true : false;
  const dispatch = useDispatch();

  const isFullScreen = useSelector<RootState, boolean>(
    (state) => state.desktop.isActiveAppFullScreen
  );

  const setFullScreen = useCallback<(args: boolean) => SetActiveAppFullScreen>(
    (payload) => dispatch(setActiveAppFullScreen(payload)),
    []
  );

  let renderContent = () => (
    <Flex
      w="100%"
      h={isFullScreen ? "100%" : "726px"}
      flexDir="column"
      pb={isFullScreen ? "3rem" : 4}
    >
      <Flex
        pos="relative"
        bgColor="primary.500"
        h="30px"
        w="100%"
        borderTopRadius={isFullScreen ? "0" : "10px"}
        borderTop="1px solid rgba(0, 0, 0, 0.1)"
        borderRight="1px solid rgba(0, 0, 0, 0.1)"
        borderLeft="1px solid rgba(0, 0, 0, 0.1)"
      >
        <Text
          flexGrow={1}
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          color="aliceblue"
          pt="2px"
          fontWeight="600"
          letterSpacing="wider"
        >
          {title}
        </Text>
        <Flex
          alignItems="center"
          cursor="pointer"
          onClick={() => {
            setFullScreen(!isFullScreen);
          }}
          _hover={{ bgColor: "primary.600" }}
        >
          <Icon
            as={isFullScreen ? BiExitFullscreen : BiFullscreen}
            w={isFullScreen ? "20px" : "16px"}
            h={isFullScreen ? "20px" : "16px"}
            color="white"
            mr={5}
            ml={5}
          />
        </Flex>
        <Flex
          alignItems="center"
          cursor="pointer"
          onClick={onClose}
          _hover={{ bgColor: "primary.600" }}
        >
          <CloseIcon w={3} h={3} color="white" mr={5} ml={5} />
        </Flex>
      </Flex>
      <Flex
        bgColor={bgColor ?? "white"}
        borderBottomRadius={isFullScreen ? "0" : "10px"}
        p={noPadding ? 0 : 4}
        // minH={isFullScreen ? "unset" : "700px"}
        overflowY="auto"
        flexDir="column"
        h={isFullScreen ? "100%" : "unset"}
      >
        {children}
      </Flex>
    </Flex>
  );

  if (isFullScreen) {
    return (
      <Flex
        w="100vw"
        h="100vh"
        pos="absolute"
        top="0"
        left="0"
        zIndex={zIndex.fullScreenAppWindow}
      >
        {renderContent()}
      </Flex>
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
        {renderContent()}
      </Container>
    );
  }
}
