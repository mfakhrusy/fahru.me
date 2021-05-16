import { Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { MutableRefObject, useRef } from "react";

type ContainerProps = {
  isMobileIcon: boolean;
};

const Container = styled(motion.div)<ContainerProps>`
  width: ${({ isMobileIcon }) => (isMobileIcon ? "80px" : "70px")};
  height: ${({ isMobileIcon }) => (isMobileIcon ? "100px" : "")};
  min-height: ${({ isMobileIcon }) => (isMobileIcon ? "" : "90px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

type Props = {
  iconName: string;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
  onClick?: () => void;
  onDoubleClick?: () => void;
  isFocused?: boolean;
  title: string;
};

export function DesktopIcon({
  iconName,
  dragConstraintRef,
  onClick,
  onDoubleClick,
  isFocused = false,
  title,
}: Props) {
  const isDraggable = dragConstraintRef ? true : false;
  const isMobileIcon = !isDraggable;
  const bgColor = isFocused ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0)";

  return (
    <Container
      isMobileIcon={isMobileIcon}
      drag={isDraggable}
      dragConstraints={dragConstraintRef}
      dragElastic={0}
      dragTransition={{
        bounceStiffness: 0,
        min: 0,
        max: 0,
        power: 0,
        bounceDamping: 0,
      }}
      onDoubleClick={onDoubleClick}
      onClick={onClick}
      onDragStart={onClick}
    >
      <Flex
        w="70px"
        h="70px"
        p="5px"
        m={isMobileIcon ? "5px" : "0"}
        bgColor={bgColor}
        borderTopRadius="8px"
        cursor="pointer"
        backgroundImage={`url(/icons/${iconName})`}
        backgroundSize="100%"
        backgroundRepeat="no-repeat"
        flexGrow={1}
      />
      <Text
        fontSize="12px"
        fontWeight="600"
        textAlign="center"
        color="#FFFFFF"
        textShadow="1px 1px 1px black"
        bgColor={bgColor}
        w="100%"
        borderBottomRadius="8px"
      >
        {title}
      </Text>
    </Container>
  );
}
