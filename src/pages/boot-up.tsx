import { useRouter } from "next/router";
import { useEffect } from "react";
import { BootUpView } from "@/components/bootUp/BootUpView";
import { BlackTerminalPage } from "@/components/shared/BlackTerminalPage";

export default function BootUpScreen() {
  const router = useRouter();
  const ttyIndex = router.query.ttyIndex;

  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        router.replace("/tty/1");
      }
    };

    const touchEventHandler = () => {
      router.replace("/tty/1");
    };

    window.addEventListener("keydown", eventHandler);
    window.addEventListener("touchend", touchEventHandler);

    return () => {
      window.removeEventListener("keydown", eventHandler);
      window.removeEventListener("touchend", touchEventHandler);
    };
  });

  return (
    <BlackTerminalPage>
      <BootUpView />
    </BlackTerminalPage>
  );
}
