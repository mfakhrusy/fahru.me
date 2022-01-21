import { Flex } from "@chakra-ui/react";
import { MutableRefObject, useCallback } from "react";
import dynamic from "next/dynamic";
import { DesktopMainView } from "@/components/desktop/DesktopMainView";
import { DesktopTaskbar } from "@/components/desktop/taskbar/DesktopTaskbar";
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
  AppBlog,
  AppTodo,
} from "@/components/desktop/apps";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveDesktopApp as setActiveDesktopAppAction,
  SetActiveDesktopAppAction,
} from "@/store/desktop";
import usePageViewTracking from "@/lib/usePageViewTracking";
import useIsTouchDevice from "@/lib/useIsTouchDevice";

function DesktopScreen() {
  usePageViewTracking();
  const isTouchDevice = useIsTouchDevice();

  const dispatch = useDispatch();
  const activeDesktopApp = useSelector<RootState, DesktopApp>(
    (state) => state.desktop.activeDesktopApp
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
      case "AppBlog":
        return (
          <AppBlog
            dragConstraintRef={dragConstraintRef}
            isOpen={activeDesktopApp === "AppBlog"}
            onClose={onCloseApp}
          />
        );
      case "AppTodo":
        return (
          <AppTodo
            dragConstraintRef={dragConstraintRef}
            isOpen={activeDesktopApp === "AppTodo"}
            onClose={onCloseApp}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Flex
      flexDir="column"
      h="100vh"
      w="100vw"
      overflowY="hidden"
      overflowX="hidden"
    >
      {isTouchDevice ? (
        <DesktopTouchView renderActiveApp={() => renderContent()} />
      ) : (
        <>
          <DesktopTaskbar />
          <DesktopMainView
            renderActiveApp={(dragConstraintRef) =>
              renderContent(dragConstraintRef)
            }
          />
        </>
      )}
    </Flex>
  );
}

export default dynamic(() => Promise.resolve(DesktopScreen), {
  ssr: false,
});
