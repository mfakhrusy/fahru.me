import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BlackTerminalPage } from "@/components/shared/BlackTerminalPage";
import { Typewriter } from "@/components/shared/Typewriter";
import useIsTouchDevice from "@/lib/useIsTouchDevice";

type State = "blank" | "initialActivation";

export function ShutdownView() {
  const isTouchDevice = useIsTouchDevice();
  const [state, setState] = useState<State>("blank");
  const router = useRouter();

  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      if (state === "blank") {
        setState("initialActivation");
      } else if (state === "initialActivation") {
        if (event.key === "Enter") {
          router.replace("/boot-up");
        }
      }
    };

    const clickEventHandler = () => {
      if (state === "blank") {
        setState("initialActivation");
      } else if (state === "initialActivation") {
        router.replace("/boot-up");
      }
    };

    window.addEventListener("keydown", eventHandler);
    window.addEventListener("touchend", clickEventHandler);
    window.addEventListener("mousedown", clickEventHandler);

    return () => {
      window.removeEventListener("keydown", eventHandler);
      window.removeEventListener("touchend", clickEventHandler);
      window.removeEventListener("mousedown", clickEventHandler);
    };
  });

  return (
    <BlackTerminalPage>
      {state === "initialActivation" && (
        <Typewriter
          text={
            isTouchDevice
              ? "tap the screen to start the boot process"
              : "hit ENTER/RETURN key to start the boot process"
          }
          stepTimeSecond={0.02}
        />
      )}
    </BlackTerminalPage>
  );
}
