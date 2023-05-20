import type { MutableRefObject } from "react";
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
import type { RootState } from "@/store";
type AppContentProps = {
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export const DesktopAppContent = ({ dragConstraintRef }: AppContentProps) => {
  const activeDesktopApp = useSelector<RootState, DesktopApp>(
    (state) => state.desktop.activeDesktopApp
  );

  switch (activeDesktopApp) {
    case "AppTerminal":
      return <AppTerminal dragConstraintRef={dragConstraintRef} />;
    case "AppAboutMe":
      return <AppAboutMe dragConstraintRef={dragConstraintRef} />;
    case "AppAboutSite":
      return <AppAboutSite dragConstraintRef={dragConstraintRef} />;
    case "AppWorkHistory":
      return <AppWorkHistory dragConstraintRef={dragConstraintRef} />;
    case "AppEducation":
      return <AppEducation dragConstraintRef={dragConstraintRef} />;
    case "AppContacts":
      return <AppContacts dragConstraintRef={dragConstraintRef} />;
    case "AppProjects":
      return <AppProjects dragConstraintRef={dragConstraintRef} />;
    case "AppBlog":
      return <AppBlog dragConstraintRef={dragConstraintRef} />;
    case "AppTodo":
      return <AppTodo dragConstraintRef={dragConstraintRef} />;
    default:
      return null;
  }
};
