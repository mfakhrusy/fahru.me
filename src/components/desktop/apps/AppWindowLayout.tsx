import { CloseIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/layout";
import { BackgroundProps } from "@chakra-ui/styled-system";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { MutableRefObject, PropsWithChildren } from "react";

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
      <Flex w="100%" h="100$" flexDir="column">
        <Flex
          pos="relative"
          bgColor="primary.500"
          h="30px"
          w="100%"
          borderTopRadius="10px"
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
            onClick={onClose}
            _hover={{ bgColor: "primary.600" }}
          >
            <CloseIcon w="12px" h="12px" color="white" mr={5} ml={5} />
          </Flex>
        </Flex>
        <Flex
          bgColor={bgColor ?? "white"}
          borderBottomRadius="10px"
          p={noPadding ? 0 : 4}
          minH="700px"
        >
          {children}
        </Flex>
      </Flex>
    </Container>
  );
}
