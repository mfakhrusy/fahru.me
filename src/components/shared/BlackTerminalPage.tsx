import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function BlackTerminalPage({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <Flex
      w="100vw"
      h="100vh"
      bgColor="black"
      p="10px"
      flexDir="column"
      color="white"
      fontFamily="DOS VGA"
      height="auto"
      minHeight="100vh"
    >
      {children}
    </Flex>
  );
}
