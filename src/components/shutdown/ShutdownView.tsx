import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BlackTerminalPage } from "../shared/BlackTerminalPage";
import { Typewriter } from "../shared/Typewriter";

type State = "blank" | "initialActivation";

export function ShutdownView() {
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

    window.addEventListener("keypress", eventHandler);

    return () => window.removeEventListener("keypress", eventHandler);
  });

  return (
    <BlackTerminalPage>
      {state === "initialActivation" && (
        <Typewriter
          text="hit ENTER or RETURN key to start the boot process"
          stepTimeSecond={0.02}
        />
      )}
    </BlackTerminalPage>
  );
}
