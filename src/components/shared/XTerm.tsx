import { executeCommand } from "@/lib/terminal/terminal";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Terminal as Terminal_ } from "xterm";
import { FitAddon } from "xterm-addon-fit";

export function XTerm() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (ref.current) {
      const terminal = new Terminal_({
        cursorStyle: "bar",
        cursorBlink: true,
        lineHeight: 1.2,
      });
      const fitAddon = new FitAddon();

      terminal.loadAddon(fitAddon);
      let command = "";
      terminal.open(ref.current);
      fitAddon.fit();
      terminal.focus();
      terminal.write("\r\n");
      terminal.write("\x1b[1;37m" + "guest@fakhrusy.com ~$ ");
      terminal.onKey((e) => {
        const ev = e.domEvent;

        if (ev.key === "Enter") {
          executeCommand({ command, terminal, router });
          if (command === "") {
            terminal.write("\x1b[1;37m" + "guest@fakhrusy.com ~$ ");
          } else {
            terminal.write("\r\n\x1b[1;37m" + "guest@fakhrusy.com ~$ ");
          }
          command = "";
        } else if (ev.key === "Backspace") {
          if (command !== "") {
            command = command.slice(0, -1);
            terminal.write("\b \b");
          }
        } else {
          command += e.key;
          terminal.write(e.key);
        }
      });
    }
  }, [ref]);

  return <Box ref={ref} bgColor="black" />;
}
