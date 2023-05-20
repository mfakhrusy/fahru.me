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

export const DesktopAppContent = () => {
  const activeDesktopApp = useSelector<RootState, DesktopApp>(
    (state) => state.desktop.activeDesktopApp
  );

  switch (activeDesktopApp) {
    case "AppTerminal":
      return <AppTerminal />;
    case "AppAboutMe":
      return <AppAboutMe />;
    case "AppAboutSite":
      return <AppAboutSite />;
    case "AppWorkHistory":
      return <AppWorkHistory />;
    case "AppEducation":
      return <AppEducation />;
    case "AppContacts":
      return <AppContacts />;
    case "AppProjects":
      return <AppProjects />;
    case "AppBlog":
      return <AppBlog />;
    case "AppTodo":
      return <AppTodo />;
    default:
      return null;
  }
};
