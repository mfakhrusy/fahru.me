import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function Provider({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
