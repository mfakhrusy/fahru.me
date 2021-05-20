import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import { PropsWithChildren } from "react";
import store from "./store";
import theme from "@/config/theme";

export function Provider({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </ReduxProvider>
  );
}
