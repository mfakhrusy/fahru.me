import { DesktopApp } from "@/lib/desktop/desktop";
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
      className="not-drag-area"
    >
      <DesktopIcon
        iconName="terminal.png"
        onClick={() => setDesktopApp("AppTerminal")}
        title="Terminal"
      />
      <DesktopIcon iconName="config-users.png" title="About me" />
    </Flex>
  );
}
