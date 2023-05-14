import { Flex } from "@chakra-ui/layout";
import { BackgroundProps } from "@chakra-ui/styled-system";
import type { MutableRefObject, PropsWithChildren } from "react";
import { AppMobileLayout } from "@/components/desktop/apps/layout/AppMobileLayout";
import { AppWindowLayout } from "@/components/desktop/apps/layout/AppWindowLayout";
import useIsTouchDevice from "@/lib/useIsTouchDevice";

type Props = {
  dragConstraintRef: MutableRefObject<HTMLDivElement>;
  onClose: () => void;
  isOpen: boolean;
  title: string;
  bgColor?: BackgroundProps["bgColor"];
  isScrollable?: boolean;
  noPadding?: boolean;
};

export function AppLayout({
  dragConstraintRef,
  onClose,
  isOpen,
  children,
  title,
  bgColor = "white",
  isScrollable = true,
  noPadding = false,
}: PropsWithChildren<Props>) {
  const isTouchDevice = useIsTouchDevice();

  const renderContent = (noPadding: boolean) => (
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

  return isTouchDevice ? (
    <AppMobileLayout
      title={title}
      onClose={onClose}
      isOpen={isOpen}
      bgColor={bgColor}
      isScrollable={isScrollable}
      noPadding={noPadding}
    >
      {renderContent(noPadding)}
    </AppMobileLayout>
  ) : (
    <AppWindowLayout
      onClose={onClose}
      title={title}
      dragConstraintRef={dragConstraintRef}
      bgColor={bgColor}
      noPadding={noPadding}
    >
      {renderContent(noPadding)}
    </AppWindowLayout>
  );
}
