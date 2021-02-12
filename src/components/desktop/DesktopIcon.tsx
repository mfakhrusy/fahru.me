import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MutableRefObject } from "react";

type Props = {
  iconName: string;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
  onClick?: () => void;
  onDoubleClick?: () => void;
  isActive?: boolean;
};

export function DesktopIcon({
  iconName,
  dragConstraintRef,
  onClick,
  onDoubleClick,
  isActive = false,
}: Props) {
  const isMobileIcon = dragConstraintRef ? true : false;
  const isDraggable = isMobileIcon;

  return (
    <motion.div
      style={{ width: "70px", height: "70px" }}
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
        bgColor={isActive ? "rgba(0, 0, 255, 0.2)" : "rgba(0, 0, 0, 0.05)"}
        borderRadius="8px"
        cursor="pointer"
        backgroundImage={`url(/icons/${iconName})`}
        backgroundSize="100%"
      />
    </motion.div>
  );
}
