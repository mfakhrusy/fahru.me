import { useRouter } from "next/router";
import { useEffect } from "react";
import { BootUpView } from "@/components/bootUp/BootUpView";
import { BlackTerminalPage } from "@/components/shared/BlackTerminalPage";
import dynamic from "next/dynamic";

function BootUpScreen() {
  const router = useRouter();

  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        router.replace("/home");
      }
    };

    const touchEventHandler = () => {
      router.replace("/home");
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

export default dynamic(() => Promise.resolve(BootUpScreen), {
  ssr: false,
});
