import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";
import theme from "@/config/theme";
import ConnectionCheckerProvider from "@/ConnectionCheckerProvider";

export function Provider({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <ConnectionCheckerProvider>{children}</ConnectionCheckerProvider>
      </ChakraProvider>
    </ReduxProvider>
  );
}
