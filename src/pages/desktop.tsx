import { DesktopMainView } from "@/components/desktop/DesktopMainView";
import { DesktopTaskbar } from "@/components/desktop/DesktopTaskbar";
import { DesktopTouchView } from "@/components/desktop/DesktopTouchView";
import { DesktopApp } from "@/lib/desktop/desktop";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { useCallback, useRef } from "react";
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
  AppMenuState,
  setActiveDesktopApp as setActiveDesktopAppAction,
  SetActiveDesktopAppAction,
  disableAppMenu as disableAppMenuAction,
} from "@/store/desktop";
import { DesktopAppMenu } from "@/components/desktop/DesktopAppMenu";
import { useClickOutside } from "@/lib/useClickOutside";

function DesktopScreen() {
  const [isBigScreen] = useMediaQuery("(min-width: 961px)");
  const dispatch = useDispatch();
  const activeDesktopApp = useSelector<RootState, DesktopApp>(
    (state) => state.desktop.activeDesktopApp
  );

  const appMenuState = useSelector<RootState, AppMenuState>(
    (state) => state.desktop.appMenu
  );

  const setActiveDesktopApp = useCallback<
    (args: DesktopApp) => SetActiveDesktopAppAction
  >((payload) => dispatch(setActiveDesktopAppAction(payload)), []);

  const renderContent = (activeDesktopApp: DesktopApp) => {
    const onCloseApp = () => setActiveDesktopApp("DesktopMainView");

    switch (activeDesktopApp) {
      case "AppTerminal":
        return (
          <AppTerminal
            isOpen={activeDesktopApp === "AppTerminal"}
            onClose={onCloseApp}
          />
        );
      case "AppAboutMe":
        return (
          <AppAboutMe
            isOpen={activeDesktopApp === "AppAboutMe"}
            onClose={onCloseApp}
          />
        );
      case "AppAboutSite":
        return (
          <AppAboutSite
            isOpen={activeDesktopApp === "AppAboutSite"}
            onClose={onCloseApp}
          />
        );
      case "AppWorkHistory":
        return (
          <AppWorkHistory
            isOpen={activeDesktopApp === "AppWorkHistory"}
            onClose={onCloseApp}
          />
        );
      case "AppEducation":
        return (
          <AppEducation
            isOpen={activeDesktopApp === "AppEducation"}
            onClose={onCloseApp}
          />
        );
      case "AppContacts":
        return (
          <AppContacts
            isOpen={activeDesktopApp === "AppContacts"}
            onClose={onCloseApp}
          />
        );
      case "AppProjects":
        return (
          <AppProjects
            isOpen={activeDesktopApp === "AppProjects"}
            onClose={onCloseApp}
          />
        );
      default:
        return null;
    }
  };

  const disableAppMenu = useCallback<() => void>(
    () => dispatch(disableAppMenuAction()),
    []
  );

  const appMenuRef = useRef<HTMLDivElement>(null);
  const taskbarRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    targetRef: appMenuRef,
    fn: () => disableAppMenu(),
    exceptionRef: taskbarRef,
  });

  return (
    <Flex flexDir="column" h="100vh" w="100vw" overflowY="hidden">
      {isBigScreen && !isMobile ? (
        <DesktopTaskbar forwardRef={taskbarRef} />
      ) : null}
      <DesktopAppMenu
        isActive={appMenuState.isActive}
        forwardRef={appMenuRef}
      />
      {isMobile ? <DesktopTouchView /> : <DesktopMainView />}
      {renderContent(activeDesktopApp)}
    </Flex>
  );
}

export default dynamic(() => Promise.resolve(DesktopScreen), {
  ssr: false,
});
