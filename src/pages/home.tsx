import { ASCIITitle } from "@/components/shared/ASCIITitle";
import { BlackTerminalPage } from "@/components/shared/BlackTerminalPage";
import { Terminal } from "@/components/shared/Terminal";
import { Typewriter } from "@/components/shared/Typewriter";
import { Box, Flex } from "@chakra-ui/react";
import { useMemo, useState } from "react";

type State = "mainIntro" | "secondIntro" | "interactive";

export default function HomeScreen() {
  const [state, setState] = useState<State>("mainIntro");

  const mainIntro = useMemo(() => {
    return (
      <Typewriter
        text="Hello, my name is Fahru, I'm a Software Engineer"
        onFinish={() => setState("secondIntro")}
        stepTimeSecond={0.05}
      />
    );
  }, []);

  const secondIntro = useMemo(() => {
    if (state !== "mainIntro") {
      return (
        <Typewriter
          text="type 'help' and hit ENTER or RETURN key to see available commands"
          onFinish={() => setState("interactive")}
          stepTimeSecond={0.05}
          onFinishDelay={200}
        />
      );
    }
  }, [state]);

  return (
    <BlackTerminalPage>
      <ASCIITitle />
      <Box h={5} />
      <Flex w="100%" flexDir="column">
        {mainIntro}
        {secondIntro}
      </Flex>
      {state === "interactive" && <Terminal />}
    </BlackTerminalPage>
  );
}
