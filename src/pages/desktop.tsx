import { DesktopMainView } from "@/components/desktop/DesktopMainView";
import { DesktopTaskbar } from "@/components/desktop/DesktopTaskbar";
import { DesktopTouchView } from "@/components/desktop/DesktopTouchView";
import { DesktopApp } from "@/lib/desktop/desktop";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { Dispatch, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { isMobile } from "react-device-detect";
import { RootState } from "@/store";
import {
  AppTerminal,
  AppAboutMe,
  AppAboutSite,
  AppWorkHistory,
  AppContacts,
  AppEducation,
  AppProjects,
} from "@/components/desktop/apps";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveDesktopApp as setActiveDesktopAppAction,
  SetActiveDesktopAppAction,
} from "@/store/desktop";

function DesktopScreen() {
  const [isBigScreen] = useMediaQuery("(min-width: 961px)");
  const dispatch = useDispatch();
  const activeDesktopApp = useSelector<RootState, DesktopApp>(
    (state) => state.desktop.activeDesktopApp
  );
  const setActiveDesktopApp = useCallback<
    (args: DesktopApp) => SetActiveDesktopAppAction
  >((payload) => dispatch(setActiveDesktopAppAction(payload)), []);

  const renderContent = (activeDesktopApp: DesktopApp) => {
    switch (activeDesktopApp) {
      case "AppTerminal":
        return (
          <AppTerminal
            isOpen={activeDesktopApp === "AppTerminal"}
            onClose={() => setActiveDesktopApp("DesktopMainView")}
          />
        );
      case "AppAboutMe":
        return (
          <AppAboutMe
            isOpen={activeDesktopApp === "AppAboutMe"}
            onClose={() => setActiveDesktopApp("DesktopMainView")}
          />
        );
      case "AppAboutSite":
        return (
          <AppAboutSite
            isOpen={activeDesktopApp === "AppAboutSite"}
            onClose={() => setActiveDesktopApp("DesktopMainView")}
          />
        );
      case "AppWorkHistory":
        return (
          <AppWorkHistory
            isOpen={activeDesktopApp === "AppWorkHistory"}
            onClose={() => setActiveDesktopApp("DesktopMainView")}
          />
        );
      case "AppEducation":
        return (
          <AppEducation
            isOpen={activeDesktopApp === "AppEducation"}
            onClose={() => setActiveDesktopApp("DesktopMainView")}
          />
        );
      case "AppContacts":
        return (
          <AppContacts
            isOpen={activeDesktopApp === "AppContacts"}
            onClose={() => setActiveDesktopApp("DesktopMainView")}
          />
        );
      case "AppProjects":
        return (
          <AppProjects
            isOpen={activeDesktopApp === "AppProjects"}
            onClose={() => setActiveDesktopApp("DesktopMainView")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Flex flexDir="column" h="100vh" w="100vw" overflowY="hidden">
      {isMobile ? <DesktopTouchView /> : <DesktopMainView />}
      {renderContent(activeDesktopApp)}
      {isBigScreen && !isMobile ? <DesktopTaskbar /> : null}
    </Flex>
  );
}

export default dynamic(() => Promise.resolve(DesktopScreen), {
  ssr: false,
});
