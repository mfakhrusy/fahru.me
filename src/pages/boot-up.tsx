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

    window.addEventListener("keypress", eventHandler);
    window.addEventListener("ontouchend", eventHandler);

    return () => {
      window.removeEventListener("keypress", eventHandler);
      window.removeEventListener("ontouchend", eventHandler);
    }
  });

  return (
    <BlackTerminalPage>
      <BootUpView />
    </BlackTerminalPage>
  );
}
