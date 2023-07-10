import { Box, Flex, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { isAndroid } from "react-device-detect";
import { ASCIITitle } from "@/components/shared/ASCIITitle";
import { BlackTerminalPage } from "@/components/shared/BlackTerminalPage";
import { MultilineTypewriter } from "@/components/shared/MultilineTypewriter";
import { Terminal } from "@/components/shared/Terminal";

type State = "intro" | "interactive";

function HomeScreen() {
  const [state, setState] = useState<State>("intro");

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
        {isAndroid && state === "interactive" ? (
          <>
            <Text>
              For Android users: press ENTER once if you have trouble typing
              anything
            </Text>
            <Box h={5} />
          </>
        ) : null}
      </Flex>
      {state === "interactive" && <Terminal withHelp />}
    </BlackTerminalPage>
  );
}

export default dynamic(() => Promise.resolve(HomeScreen), {
  ssr: false,
});
