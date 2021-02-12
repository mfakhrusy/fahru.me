import { NextRouter } from "next/router";
import { Terminal as Terminal_ } from "xterm";
import { isMobileOnly } from "react-device-detect";

export type TerminalCommand =
  | "help"
  | "startx"
  | "reboot"
  | "shutdown"
  | "clear"
  | string;

type Config = {
  command: TerminalCommand;
  terminal: Terminal_;
  router: NextRouter;
};

export function executeCommand({ command, terminal, router }: Config) {
  const trimmedCommand = command.trim();
  const newline = terminal.write("\r\n");

  switch (trimmedCommand) {
    case "help":
      if (isMobileOnly) {
        newline;
        terminal.write("\r\nAvailable commands:");
        newline;
        terminal.write(`\r\n  help\t\tgetting this help`);
        terminal.write(`\r\n  startx\taccess desktop`);
        terminal.write(`\r\n  shutdown\tshut the site down`);
        terminal.write(`\r\n  reboot\trestart the site`);
        terminal.write("\r\n  clear\t\tclear the terminal\r\n");
      } else {
        newline;
        terminal.write("\r\nAvailable commands:");
        newline;
        terminal.write("\r\n\thelp\t\tgetting this help");
        terminal.write("\r\n\tstartx\t\taccess desktop");
        terminal.write("\r\n\tshutdown\tshut the site down");
        terminal.write("\r\n\treboot\t\trestart the site");
        terminal.write("\r\n\tclear\t\tclear the terminal\r\n");
      }
      break;
    case "startx":
      if (router.pathname.includes('desktop')) {
        terminal.write("you're already on desktop");
      } else {
        router.replace("/desktop");
      }
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
    case "clear":
      terminal.write("\x1bc");
      break;
    default:
      if (command !== "") {
        newline;
        terminal.write("command not found: " + command);
      }
      break;
  }
}
