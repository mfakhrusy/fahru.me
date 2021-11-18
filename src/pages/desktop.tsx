import { Flex, useMediaQuery } from "@chakra-ui/react";
import { MutableRefObject, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { DesktopMainView } from "@/components/desktop/DesktopMainView";
import { DesktopTaskbar } from "@/components/desktop/taskbar/DesktopTaskbar";
import { DesktopAppMenu } from "@/components/desktop/taskbar/DesktopAppMenu";
import { DesktopTouchView } from "@/components/desktop/DesktopTouchView";
import { DesktopApp } from "@/lib/desktop/desktop";
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
import useClickOutside from "@/lib/useClickOutside";
import usePageViewTracking from "@/lib/usePageViewTracking";
import useIsTouchDevice from "@/lib/useIsTouchDevice";

function DesktopScreen() {
  usePageViewTracking();
  const isTouchDevice = useIsTouchDevice();

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

  const renderContent = (
    dragConstraintRef?: MutableRefObject<HTMLDivElement>
  ) => {
    const onCloseApp = () => setActiveDesktopApp("DesktopMainView");

    switch (activeDesktopApp) {
      case "AppTerminal":
        return (
          <AppTerminal
            dragConstraintRef={dragConstraintRef}
            isOpen={activeDesktopApp === "AppTerminal"}
            onClose={onCloseApp}
          />
        );
      case "AppAboutMe":
        return (
          <AppAboutMe
            dragConstraintRef={dragConstraintRef}
            isOpen={activeDesktopApp === "AppAboutMe"}
            onClose={onCloseApp}
          />
        );
      case "AppAboutSite":
        return (
          <AppAboutSite
            dragConstraintRef={dragConstraintRef}
            isOpen={activeDesktopApp === "AppAboutSite"}
            onClose={onCloseApp}
          />
        );
      case "AppWorkHistory":
        return (
          <AppWorkHistory
            dragConstraintRef={dragConstraintRef}
            isOpen={activeDesktopApp === "AppWorkHistory"}
            onClose={onCloseApp}
          />
        );
      case "AppEducation":
        return (
          <AppEducation
            dragConstraintRef={dragConstraintRef}
            isOpen={activeDesktopApp === "AppEducation"}
            onClose={onCloseApp}
          />
        );
      case "AppContacts":
        return (
          <AppContacts
            dragConstraintRef={dragConstraintRef}
            isOpen={activeDesktopApp === "AppContacts"}
            onClose={onCloseApp}
          />
        );
      case "AppProjects":
        return (
          <AppProjects
            dragConstraintRef={dragConstraintRef}
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
    <Flex
      flexDir="column"
      h="100vh"
      w="100vw"
      overflowY="hidden"
      overflowX="hidden"
    >
      {isBigScreen && !isTouchDevice ? (
        <DesktopTaskbar forwardRef={taskbarRef} />
      ) : null}
      {!isTouchDevice && (
        <DesktopAppMenu
          isActive={appMenuState.isActive}
          forwardRef={appMenuRef}
        />
      )}
      {isTouchDevice ? (
        <DesktopTouchView renderActiveApp={() => renderContent()} />
      ) : (
        <DesktopMainView
          renderActiveApp={(dragConstraintRef) =>
            renderContent(dragConstraintRef)
          }
        />
      )}
    </Flex>
  );
}

export default dynamic(() => Promise.resolve(DesktopScreen), {
  ssr: false,
});
