export type DesktopApp =
  | "DesktopMainView"
  | "AppTerminal"
  | "AppAboutMe"
  | "AppAboutSite"
  | "AppWorkHistory"
  | "AppEducation"
  | "AppContacts";

type DesktopIcon = {
  iconName: string;
  title: string;
  appName: DesktopApp;
};

export function makeDesktopIcons(): Array<DesktopIcon> {
  return [
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
      iconName: "email.png",
      appName: "AppContacts",
      title: "Contacts",
    },
    {
      iconName: "config-users.png",
      appName: "AppAboutMe",
      title: "About Me",
    },
    {
      iconName: "terminal.png",
      appName: "AppTerminal",
      title: "Terminal",
    },
    {
      iconName: "info.png",
      appName: "AppAboutSite",
      title: "About Site",
    },
  ];
}
