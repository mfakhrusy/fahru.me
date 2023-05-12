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
};

export function makeDesktopIcons(): Array<DesktopIcon> {
  return [
    {
      iconName: "config-users.png",
      appName: "AppAboutMe",
      title: "About Me",
    },
    {
      iconName: "info.png",
      appName: "AppAboutSite",
      title: "About Site",
    },
    {
      iconName: "email.png",
      appName: "AppContacts",
      title: "Contacts",
    },
    {
      iconName: "games.png",
      appName: "AppProjects",
      title: "Hobby Projects",
    },
    {
      iconName: "education.png",
      appName: "AppEducation",
      title: "Education",
    },
    {
      iconName: "resume.png",
      appName: "AppWorkHistory",
      title: "Work History",
    },
    {
      iconName: "book.png",
      appName: "AppBlog",
      title: "Blog",
    },
    {
      iconName: "terminal.png",
      appName: "AppTerminal",
      title: "Terminal",
    },
    {
      iconName: "puzzle.png",
      appName: "AppTodo",
      title: "To-Dos",
    },
  ];
}
