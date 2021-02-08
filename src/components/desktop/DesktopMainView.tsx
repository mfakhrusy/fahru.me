import { DesktopApp } from "@/lib/desktop/desktop";
import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { DesktopIcon } from "./DesktopIcon";

type Props = {
  setDesktopApp: (app: DesktopApp) => void;
};

export function DesktopMainView({ setDesktopApp }: Props) {
  const [focusedApp, setFocusedApp] = useState<DesktopApp>("DesktopMainView");
  const dragConstraintRef = useRef<HTMLDivElement>(null);

  return (
    <Flex
      flexGrow={1}
      bgColor="aliceblue"
      backgroundImage="url(/images/butterfly-colorful.svg)"
      backgroundRepeat="no-repeat"
      pos="relative"
      backgroundPosition={{ base: "left -20px center", lg: "center center" }}
    >
      <motion.div
        style={{ width: "100%", height: "100%" }}
        className="drag-area"
        ref={dragConstraintRef}
      >
        <DesktopIcon
          iconName="config-users.png"
          dragConstraintRef={dragConstraintRef}
          onClick={() => setFocusedApp("AppConfigUsers")}
          isActive={focusedApp === "AppConfigUsers"}
        />
        <DesktopIcon
          iconName="terminal.png"
          dragConstraintRef={dragConstraintRef}
          onClick={() => setFocusedApp("AppTerminal")}
          onDoubleClick={() => setDesktopApp("AppTerminal")}
          isActive={focusedApp === "AppTerminal"}
        />
      </motion.div>
    </Flex>
  );
}
