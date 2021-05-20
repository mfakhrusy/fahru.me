import { ASCIITitle } from "@/components/shared/ASCIITitle";
import { BlackTerminalPage } from "@/components/shared/BlackTerminalPage";
import { MultilineTypewriter } from "@/components/shared/MultilineTypewriter";
import { Terminal } from "@/components/shared/Terminal";
import usePageViewTracking from "@/lib/usePageViewTracking";
import { Box, Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

type State = "intro" | "interactive";

function HomeScreen() {
  const [state, setState] = useState<State>("intro");
  usePageViewTracking();

  const intro = useMemo(
    () => (
      <MultilineTypewriter
        texts={[
          "Hello, my name is Fahru",
          "I'm a software engineer",
          "and this is my personal site",
          ". . .",
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
      {state === "interactive" && <Terminal withHelp />}
    </BlackTerminalPage>
  );
}

export default dynamic(() => Promise.resolve(HomeScreen), {
  ssr: false,
});
