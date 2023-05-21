import { useSelector } from "react-redux";
import { AppAboutMe } from "@/components/desktop/apps/AppAboutMe";
import { AppAboutSite } from "@/components/desktop/apps/AppAboutSite";
import { AppBlog } from "@/components/desktop/apps/AppBlog";
import { AppContacts } from "@/components/desktop/apps/AppContacts";
import { AppEducation } from "@/components/desktop/apps/AppEducation";
import { AppProjects } from "@/components/desktop/apps/AppProjects";
import { AppTerminal } from "@/components/desktop/apps/AppTerminal";
import { AppTodo } from "@/components/desktop/apps/AppTodo";
import { AppWorkHistory } from "@/components/desktop/apps/AppWorkHistory";
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
