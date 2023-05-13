import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  AnimatedText,
  TerminalProcessAnimation,
} from "@/components/shared/TerminalProcessAnimation";

const makeText: () => Array<AnimatedText> = () => [
  { value: "Shutdown process is started", status: "Ok" },
  {
    value: "Don't close the browser window...",
    status: "Loading",
  },
  { value: ". . .", status: "Loading" },
  { value: ". . .", status: "Error" },
  { value: "Retrying shutdown process", status: "Loading" },
  { value: ". . .", status: "Loading" },
  { value: "Site is down", status: "Ok" },
  { value: "3", status: "Loading" },
  { value: "2", status: "Loading" },
  { value: "1", status: "Loading" },
  { value: "Thank you for visiting, see you later!", status: "Ok" },
];

export function ShutdownProcessView() {
  const stepTimeInSecond = 0.25;
  const text = makeText();
  const duration = text.length * stepTimeInSecond;
  const router = useRouter();
  const reboot = router.query.reboot;

  useEffect(() => {
    if (reboot) {
      setTimeout(() => router.replace("/boot-up"), duration * 1000 + 1000);
    } else {
      setTimeout(() => router.replace("/shutdown"), duration * 1000 + 1000);
    }
  }, [duration, reboot, router]);

  return (
    <TerminalProcessAnimation text={text} stepTimeInSecond={stepTimeInSecond} />
  );
}
