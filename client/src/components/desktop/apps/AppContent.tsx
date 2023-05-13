import { MutableRefObject, useCallback } from "react";
import {
  setActiveDesktopApp as setActiveDesktopAppAction,
  SetActiveDesktopAppAction,
} from "@/store/desktop";
import { useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import {
  AppAboutMe,
  AppAboutSite,
  AppBlog,
  AppContacts,
  AppEducation,
  AppProjects,
  AppTerminal,
  AppTodo,
  AppWorkHistory,
} from "@/components/desktop/apps";
import type { DesktopApp } from "@/lib/desktop/desktop";

type AppContentProps = {
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export const AppContent = ({ dragConstraintRef }: AppContentProps) => {
  const dispatch = useDispatch();

  const setActiveDesktopApp = useCallback<
    (args: DesktopApp) => SetActiveDesktopAppAction
  >((payload) => dispatch(setActiveDesktopAppAction(payload)), [dispatch]);

  const activeDesktopApp = useSelector<RootState, DesktopApp>(
    (state) => state.desktop.activeDesktopApp
  );

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
