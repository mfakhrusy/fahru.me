import { Flex } from "@chakra-ui/layout";
import type { PropsWithChildren } from "react";
import useIsTouchDevice from "@/lib/useIsTouchDevice";

type AppLayoutContentProps = {
  noPadding?: boolean;
};

export function AppLayoutContent({
  children,
  noPadding = false,
}: PropsWithChildren<AppLayoutContentProps>) {
  const isTouchDevice = useIsTouchDevice();

  return (
    <Flex
      flexDir="column"
      w="100%"
      h={isTouchDevice ? "auto" : "unset"}
      minH={isTouchDevice ? "calc(100vh - 57px)" : "unset"}
      pb={noPadding ? 0 : 4}
    >
      {children}
    </Flex>
  );
}
