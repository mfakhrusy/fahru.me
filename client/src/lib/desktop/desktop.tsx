import { AppAboutMe } from "@/components/desktop/apps/AppAboutMe";
import { AppAboutSite } from "@/components/desktop/apps/AppAboutSite";
import { AppBlog } from "@/components/desktop/apps/AppBlog";
import { AppContacts } from "@/components/desktop/apps/AppContacts";
import { AppEducation } from "@/components/desktop/apps/AppEducation";
import { AppProjects } from "@/components/desktop/apps/AppProjects";
import { AppTerminal } from "@/components/desktop/apps/AppTerminal";
import { AppTodo } from "@/components/desktop/apps/AppTodo";
import { AppWorkHistory } from "@/components/desktop/apps/AppWorkHistory";

export const desktopApp = [
  "DesktopMainView",
  "AppTerminal",
  "AppAboutMe",
  "AppAboutSite",
  "AppWorkHistory",
  "AppEducation",
  "AppContacts",
  "AppProjects",
  "AppBlog",
  "AppTodo",
] as const;

export type DesktopApp = (typeof desktopApp)[number];

type DesktopIcon = {
  iconName: string;
  title: string;
  appName: DesktopApp;
  component: React.ReactNode;
};

export function makeDesktopIcons(): Array<DesktopIcon> {
  return [
    {
      iconName: "config-users.png",
      appName: "AppAboutMe",
      title: "About Me",
      component: <AppAboutMe />,
    },
    {
      iconName: "info.png",
      appName: "AppAboutSite",
      title: "About Site",
      component: <AppAboutSite />,
    },
    {
      iconName: "email.png",
      appName: "AppContacts",
      title: "Contacts",
      component: <AppContacts />,
    },
    {
      iconName: "games.png",
      appName: "AppProjects",
      title: "Hobby Projects",
      component: <AppProjects />,
    },
    {
      iconName: "education.png",
      appName: "AppEducation",
      title: "Education",
      component: <AppEducation />,
    },
    {
      iconName: "resume.png",
      appName: "AppWorkHistory",
      title: "Work History",
      component: <AppWorkHistory />,
    },
    {
      iconName: "book.png",
      appName: "AppBlog",
      title: "Blog",
      component: <AppBlog />,
    },
    {
      iconName: "terminal.png",
      appName: "AppTerminal",
      title: "Terminal",
      component: <AppTerminal />,
    },
    {
      iconName: "puzzle.png",
      appName: "AppTodo",
      title: "To-Dos",
      component: <AppTodo />,
    },
  ];
}
