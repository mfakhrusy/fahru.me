import { ASCIITitle } from "@/components/shared/ASCIITitle";
import { BlackTerminalPage } from "@/components/shared/BlackTerminalPage";
import { MultilineTypewriter } from "@/components/shared/MultilineTypewriter";
import { Terminal } from "@/components/shared/Terminal";
import { Typewriter } from "@/components/shared/Typewriter";
import { Box, Flex } from "@chakra-ui/react";
import { useMemo, useState } from "react";

type State = "intro" | "interactive";

export default function HomeScreen() {
  const [state, setState] = useState<State>("intro");

  const intro = useMemo(
    () => (
      <MultilineTypewriter
        texts={[
          "Hello, my name is Fahru",
          "I'm a software engineer",
          "and this is my personal site",
          ". . .",
          "to see available commands",
          "type 'help' and hit ENTER or RETURN",
        ]}
        onFinish={() => setState("interactive")}
      />
    ),
    []
  );

  return (
    <BlackTerminalPage>
      <ASCIITitle />
      <Box h={5} />
      <Flex w="100%" flexDir="column">
        {intro}
      </Flex>
      {state === "interactive" && <Terminal />}
    </BlackTerminalPage>
  );
}
