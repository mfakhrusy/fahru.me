import type { BackgroundProps } from "@chakra-ui/styled-system";
import type { PropsWithChildren } from "react";
import { AppDesktopLayout } from "@/components/desktop/apps/layout/AppDesktopLayout";
import { AppLayoutContent } from "@/components/desktop/apps/layout/AppLayoutContent";
import { AppMobileLayout } from "@/components/desktop/apps/layout/AppMobileLayout";
import useIsTouchDevice from "@/lib/useIsTouchDevice";

type Props = {
  onClose: () => void;
  title: string;
  bgColor?: BackgroundProps["bgColor"];
  isScrollable?: boolean;
  noPadding?: boolean;
};

export function AppLayout({
  onClose,
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
      bgColor={bgColor}
      noPadding={noPadding}
    >
      <AppLayoutContent noPadding={noPadding}>{children}</AppLayoutContent>
    </AppDesktopLayout>
  );
}
