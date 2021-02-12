import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MutableRefObject } from "react";
import { isMobile } from "react-device-detect";

type Props = {
  iconName: string;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
  onClick?: () => void;
  onDoubleClick?: () => void;
  isActive?: boolean;
  title: string;
};

export function DesktopIcon({
  iconName,
  dragConstraintRef,
  onClick,
  onDoubleClick,
  isActive = false,
  title,
}: Props) {
  const isDraggable = dragConstraintRef ? true : false;
  const isMobileIcon = !isDraggable;

  return (
    <motion.div
      style={{
        width: isMobileIcon ? "80px" : "70px",
        height: isMobileIcon ? "100px" : "90px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
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
        bgColor={isActive ? "rgba(0, 0, 255, 0.2)" : "rgba(0, 0, 0, 0.05)"}
        borderRadius="8px"
        cursor="pointer"
        backgroundImage={`url(/icons/${iconName})`}
        backgroundSize="100%"
        backgroundRepeat="no-repeat"
        flexGrow={1}
      />
      <Text fontSize="13px" fontWeight="600">
        {title}
      </Text>
    </motion.div>
  );
}
