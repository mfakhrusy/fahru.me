import useIsTouchDevice from "@/lib/useIsTouchDevice";
import { RootState } from "@/store";
import { Flex } from "@chakra-ui/layout";
import { BackgroundProps } from "@chakra-ui/styled-system";
import { MutableRefObject, PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { AppModalLayout } from "./AppModalLayout";
import { AppWindowLayout } from "./AppWindowLayout";

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
  const isFullScreen = useSelector<RootState, boolean>(
    (state) => state.desktop.isActiveAppFullScreen
  );

  const renderContent = () => (
    <Flex
      flexDir="column"
      w="100%"
      h={isTouchDevice ? "auto" : "unset"}
      minH={isTouchDevice ? "calc(100vh - 30px)" : "unset"}
      pb={4}
    >
      {children}
    </Flex>
  );

  return isTouchDevice ? (
    <AppModalLayout
      title={title}
      onClose={onClose}
      isOpen={isOpen}
      bgColor={bgColor}
      isScrollable={isScrollable}
      noPadding={noPadding}
    >
      {renderContent()}
    </AppModalLayout>
  ) : (
    <AppWindowLayout
      onClose={onClose}
      title={title}
      dragConstraintRef={dragConstraintRef}
      bgColor={bgColor}
      noPadding={noPadding}
    >
      {renderContent()}
    </AppWindowLayout>
  );
}
