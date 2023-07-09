import { CloseIcon } from "@chakra-ui/icons";
import { Flex, Icon, Text } from "@chakra-ui/react";
import type { BackgroundProps } from "@chakra-ui/system";
import type { PointerEvent, PropsWithChildren } from "react";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";

type AppDesktopLayoutContentProps = {
  isFullScreen: boolean;
  title: string;
  bgColor?: BackgroundProps["bgColor"];
  noPadding?: boolean;
  onClickClose: () => void;
  onClickFullscreen: (isFullscreen: boolean) => void;
  onPointerDown?: (e: PointerEvent<HTMLParagraphElement>) => void;
};

export function AppDesktopLayoutContent({
  children,
  isFullScreen,
  title,
  bgColor,
  noPadding,
  onClickClose,
  onClickFullscreen,
  onPointerDown,
}: PropsWithChildren<AppDesktopLayoutContentProps>) {
  return (
    <Flex
      w="100%"
      h={isFullScreen ? "100%" : "726px"}
      flexDir="column"
      pb={isFullScreen ? "2.1rem" : 4}
    >
      <Flex
        position="relative"
        backgroundColor="debian.500"
        minHeight="35px"
        width="100%"
        borderTopRadius={isFullScreen ? "0" : "10px"}
        borderTop="1px solid rgba(0, 0, 0, 0.1)"
        borderRight="1px solid rgba(0, 0, 0, 0.1)"
        borderLeft="1px solid rgba(0, 0, 0, 0.1)"
        onPointerDown={(e) => {
          onPointerDown?.(e);
        }}
        onDoubleClick={() => onClickFullscreen(!isFullScreen)}
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
          userSelect="none"
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
              onClickFullscreen(!isFullScreen);
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
            onClick={onClickClose}
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
        cursor="default"
      >
        {children}
      </Flex>
    </Flex>
  );
}
