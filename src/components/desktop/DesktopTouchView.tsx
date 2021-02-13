import { DesktopApp, makeDesktopIcons } from "@/lib/desktop/desktop";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { DesktopIcon } from "./DesktopIcon";

type Props = {
  setDesktopApp: (app: DesktopApp) => void;
};

export function DesktopTouchView({ setDesktopApp }: Props) {
  return (
    <Flex
      flexGrow={1}
      bgColor="aliceblue"
      backgroundImage="url(/images/butterfly-colorful.svg)"
      backgroundRepeat="no-repeat"
      pos="relative"
      backgroundPosition={{ base: "left -20px center", lg: "center center" }}
    >
      {makeDesktopIcons().map((desktopIcon) => (
        <DesktopIcon
          iconName={desktopIcon.iconName}
          onClick={() => setDesktopApp(desktopIcon.appName)}
          title={desktopIcon.title}
        />
      ))}
    </Flex>
  );
}
