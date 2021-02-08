import { Flex } from "@chakra-ui/react";
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
        router.push("/tty/1");
      }
    };

    window.addEventListener("keypress", eventHandler);

    return () => window.removeEventListener("keypress", eventHandler);
  });

  return (
    <BlackTerminalPage>
      <BootUpView />
    </BlackTerminalPage>
  );
}
