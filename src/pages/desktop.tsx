import { AppTerminal } from "@/components/desktop/apps/AppTerminal";
import { DesktopMainView } from "@/components/desktop/DesktopMainView";
import { DesktopTaskbar } from "@/components/desktop/DesktopTaskbar";
import { DesktopTouchView } from "@/components/desktop/DesktopTouchView";
import { DesktopApp } from "@/lib/desktop/desktop";
import useIsTouchDevice from "@/lib/useIsTouchDevice";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { isMobile } from "react-device-detect";

function DesktopScreen() {
  let [state, setState] = useState<DesktopApp>("DesktopMainView");
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
