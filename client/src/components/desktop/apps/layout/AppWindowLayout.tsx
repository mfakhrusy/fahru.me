import { CloseIcon, Icon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/layout";
import { BackgroundProps } from "@chakra-ui/styled-system";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { type MutableRefObject, PropsWithChildren, useCallback } from "react";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
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
    [dispatch]
  );

  const renderContent = () => (
    <Flex
      w="100%"
      h={isFullScreen ? "100%" : "726px"}
      flexDir="column"
      pb={isFullScreen ? "2.1rem" : 4}
    >
      <Flex
        pos="relative"
        bgColor="debian.500"
        minH="35px"
        w="100%"
        borderTopRadius={isFullScreen ? "0" : "10px"}
        borderTop="1px solid rgba(0, 0, 0, 0.1)"
        borderRight="1px solid rgba(0, 0, 0, 0.1)"
        borderLeft="1px solid rgba(0, 0, 0, 0.1)"
      >
        <Text
          display="flex"
          flexGrow={1}
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          color="aliceblue"
          fontWeight="600"
          letterSpacing="wider"
        >
          {title}
        </Text>
        <Flex
          pos="absolute"
          right={0}
          height="100%"
          borderTopRightRadius="10px"
        >
          <Flex
            alignItems="center"
            cursor="pointer"
            onClick={() => {
              setFullScreen(!isFullScreen);
            }}
            _hover={{ bgColor: "debian.600" }}
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
            _hover={{ bgColor: "debian.600" }}
            borderTopRightRadius="10px"
          >
            <CloseIcon w={3} h={3} color="white" mr={5} ml={5} />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        bgColor={bgColor ?? "white"}
        borderBottomRadius={isFullScreen ? "0" : "10px"}
        p={noPadding ? 0 : 4}
        overflowY="auto"
        flexDir="column"
        h={isFullScreen ? "100%" : "unset"}
        minH="500px"
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
        top="33.3%"
        left="33.3%"
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
