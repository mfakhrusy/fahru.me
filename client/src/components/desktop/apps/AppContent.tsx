import { type MutableRefObject, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import type { RootState } from "@/store";
import {
  setActiveDesktopApp as setActiveDesktopAppAction,
  SetActiveDesktopAppAction,
} from "@/store/desktop";

type AppContentProps = {
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export const AppContent = ({ dragConstraintRef }: AppContentProps) => {
  const dispatch = useDispatch();

  const activeDesktopApp = useSelector<RootState, DesktopApp>(
    (state) => state.desktop.activeDesktopApp
  );

  const setActiveDesktopApp = useCallback<
    (args: DesktopApp) => SetActiveDesktopAppAction
  >((payload) => dispatch(setActiveDesktopAppAction(payload)), [dispatch]);

  const onCloseApp = () => setActiveDesktopApp("DesktopMainView");

  switch (activeDesktopApp) {
    case "AppTerminal":
      return (
        <AppTerminal
          dragConstraintRef={dragConstraintRef}
          isOpen={activeDesktopApp === "AppTerminal"}
        />
      );
    case "AppAboutMe":
      return (
        <AppAboutMe
          dragConstraintRef={dragConstraintRef}
          isOpen={activeDesktopApp === "AppAboutMe"}
        />
      );
    case "AppAboutSite":
      return (
        <AppAboutSite
          dragConstraintRef={dragConstraintRef}
          isOpen={activeDesktopApp === "AppAboutSite"}
        />
      );
    case "AppWorkHistory":
      return (
        <AppWorkHistory
          dragConstraintRef={dragConstraintRef}
          isOpen={activeDesktopApp === "AppWorkHistory"}
        />
      );
    case "AppEducation":
      return (
        <AppEducation
          dragConstraintRef={dragConstraintRef}
          isOpen={activeDesktopApp === "AppEducation"}
        />
      );
    case "AppContacts":
      return (
        <AppContacts
          dragConstraintRef={dragConstraintRef}
          isOpen={activeDesktopApp === "AppContacts"}
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
        />
      );
    default:
      return null;
  }
};
