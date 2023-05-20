import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Provider as ReduxProvider } from "react-redux";
import theme from "@/config/theme";
import ConnectionCheckerProvider from "@/ConnectionCheckerProvider";
import DragConstraintProvider from "@/DragConstraintProvider";
import store from "@/store";

export function Provider({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <ConnectionCheckerProvider>
          <DragConstraintProvider>{children}</DragConstraintProvider>
        </ConnectionCheckerProvider>
      </ChakraProvider>
    </ReduxProvider>
  );
}
