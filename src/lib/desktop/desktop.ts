export type DesktopApp =
  | "DesktopMainView"
  | "AppTerminal"
  | "AppAboutMe"
  | "AppAboutSite";

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
