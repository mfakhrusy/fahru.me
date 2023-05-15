import type { BackgroundProps } from "@chakra-ui/styled-system";
import type { MutableRefObject, PropsWithChildren } from "react";
import { AppDesktopLayout } from "@/components/desktop/apps/layout/AppDesktopLayout";
import { AppLayoutContent } from "@/components/desktop/apps/layout/AppLayoutContent";
import { AppMobileLayout } from "@/components/desktop/apps/layout/AppMobileLayout";
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

  return isTouchDevice ? (
    <AppMobileLayout
      title={title}
      onClose={onClose}
      isOpen={isOpen}
      bgColor={bgColor}
      isScrollable={isScrollable}
      noPadding={noPadding}
    >
      <AppLayoutContent noPadding={noPadding}>{children}</AppLayoutContent>
    </AppMobileLayout>
  ) : (
    <AppDesktopLayout
      onClose={onClose}
      title={title}
      dragConstraintRef={dragConstraintRef}
      bgColor={bgColor}
      noPadding={noPadding}
    >
      <AppLayoutContent noPadding={noPadding}>{children}</AppLayoutContent>
    </AppDesktopLayout>
  );
}
