import { DesktopApp, makeDesktopIcons } from "@/lib/desktop/desktop";
import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DesktopIcon } from "./DesktopIcon";

type Props = {
  setDesktopApp: (app: DesktopApp) => void;
};

export function DesktopMainView({ setDesktopApp }: Props) {
  const [focusedApp, setFocusedApp] = useState<DesktopApp>("DesktopMainView");
  const dragConstraintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      if (focusedApp !== "DesktopMainView") {
        console.log("yey", focusedApp);
        setDesktopApp(focusedApp);
      }
    };

    window.addEventListener("keydown", eventHandler);

    return () => window.removeEventListener("keydown", eventHandler);
  }, [focusedApp]);

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
        {makeDesktopIcons().map((desktopIcon) => (
          <DesktopIcon
            iconName={desktopIcon.iconName}
            dragConstraintRef={dragConstraintRef}
            onClick={() => setFocusedApp(desktopIcon.appName)}
            onDoubleClick={() => setDesktopApp(desktopIcon.appName)}
            isActive={focusedApp === desktopIcon.appName}
            title={desktopIcon.title}
          />
        ))}
      </motion.div>
    </Flex>
  );
}
