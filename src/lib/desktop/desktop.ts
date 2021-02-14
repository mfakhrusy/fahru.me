export type DesktopApp =
  | "DesktopMainView"
  | "AppTerminal"
  | "AppAboutMe"
  | "AppAboutSite"
  | "AppWorkHistory"
  | "AppEducation"
  | "AppContacts"
  | "AppProjects";

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
      title: "Projects",
    },
    {
      iconName: "resume.png",
      appName: "AppWorkHistory",
      title: "Work History",
    },
    {
      iconName: "education.png",
      appName: "AppEducation",
      title: "Education",
    },
    {
      iconName: "terminal.png",
      appName: "AppTerminal",
      title: "Terminal",
    },
  ];
}
