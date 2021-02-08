import { NextRouter } from "next/router";
import { Terminal as Terminal_ } from "xterm";

export type TerminalCommand = "help" | "startx" | string;

type Config = {
  command: TerminalCommand;
  terminal: Terminal_;
  router: NextRouter;
};

export function executeCommand({ command, terminal, router }: Config) {
  const newline = terminal.write("\r\n");
  switch (command) {
    case "help":
      newline;
      terminal.write("\r\nAvailable commands:");
      newline;
      terminal.write("\r\n\thelp\t\tgetting this help");
      terminal.write("\r\n\tstartx\t\taccess desktop");
      terminal.write("\r\n\tshutdown\tshut the site down");
      terminal.write("\r\n\treboot\t\trestart the site\r\n");
      break;
    case "startx":
      router.replace("/desktop");
      break;
    case "shutdown":
      newline;
      terminal.write("\rSite is shutting down...");
      router.replace("/shutdown/process");
      break;
    case "reboot":
      newline;
      terminal.write("\rSite is rebooting...");
      router.replace("/shutdown/process?reboot=true");
      break;
    default:
      if (command !== "") {
        newline;
        terminal.write("command not found: " + command);
      }
      break;
  }
}
