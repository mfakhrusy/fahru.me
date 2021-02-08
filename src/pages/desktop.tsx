import { AppTerminal } from "@/components/desktop/apps/AppTerminal";
import { DesktopMainView } from "@/components/desktop/DesktopMainView";
import { DesktopTaskbar } from "@/components/desktop/DesktopTaskbar";
import { DesktopApp } from "@/lib/desktop/desktop";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";

export default function DesktopScreen() {
  let [state, setState] = useState<DesktopApp>("DesktopMainView");
  const isBigScreen = useMediaQuery("(min-width: 961px)");

  const renderContent = (state: DesktopApp) => {
    switch (state) {
      case "AppTerminal":
        return <AppTerminal onClose={() => setState("DesktopMainView")} />;
      default:
        return null;
    }
  };

  return (
    <Flex flexDir="column" h="100vh" w="100vw" overflowY="hidden">
      <DesktopMainView setDesktopApp={(app: DesktopApp) => setState(app)} />
      {renderContent(state)}
      {isBigScreen[0] ? <DesktopTaskbar /> : null}
    </Flex>
  );
}
