import { DesktopMainView } from "@/components/desktop/DesktopMainView";
import { DesktopTaskbar } from "@/components/desktop/DesktopTaskbar";
import { DesktopTouchView } from "@/components/desktop/DesktopTouchView";
import { DesktopApp } from "@/lib/desktop/desktop";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { isMobile } from "react-device-detect";
import {
  AppTerminal,
  AppAboutMe,
  AppAboutSite,
  AppWorkHistory,
} from "@/components/desktop/apps";

function DesktopScreen() {
  const [state, setState] = useState<DesktopApp>("DesktopMainView");
  const [isBigScreen] = useMediaQuery("(min-width: 961px)");

  const renderContent = (state: DesktopApp) => {
    switch (state) {
      case "AppTerminal":
        return (
          <AppTerminal
            isOpen={state === "AppTerminal"}
            onClose={() => setState("DesktopMainView")}
          />
        );
      case "AppAboutMe":
        return (
          <AppAboutMe
            isOpen={state === "AppAboutMe"}
            onClose={() => setState("DesktopMainView")}
          />
        );
      case "AppAboutSite":
        return (
          <AppAboutSite
            isOpen={state === "AppAboutSite"}
            onClose={() => setState("DesktopMainView")}
          />
        );
      case "AppWorkHistory":
        return (
          <AppWorkHistory
            isOpen={state === "AppWorkHistory"}
            onClose={() => setState("DesktopMainView")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Flex flexDir="column" h="100vh" w="100vw" overflowY="hidden">
      {isMobile ? (
        <DesktopTouchView setDesktopApp={(app: DesktopApp) => setState(app)} />
      ) : (
        <DesktopMainView setDesktopApp={(app: DesktopApp) => setState(app)} />
      )}
      {renderContent(state)}
      {isBigScreen && !isMobile ? <DesktopTaskbar /> : null}
    </Flex>
  );
}

export default dynamic(() => Promise.resolve(DesktopScreen), {
  ssr: false,
});
