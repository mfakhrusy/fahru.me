import type { BackgroundProps } from "@chakra-ui/styled-system";
import type { MutableRefObject, PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { AppDesktopLayoutFullscreen } from "@/components/desktop/apps/layout/AppDesktopLayoutFullscreen";
import { AppDesktopLayoutWindowed } from "@/components/desktop/apps/layout/AppDesktopLayoutWindowed";
import { RootState } from "@/store";

type AppDesktopLayoutProps = {
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
  title: string;
  bgColor?: BackgroundProps["bgColor"];
  onClose: () => void;
  noPadding?: boolean;
};

export function AppDesktopLayout({
  dragConstraintRef,
  children,
  bgColor,
  title,
  onClose,
  noPadding = false,
}: PropsWithChildren<AppDesktopLayoutProps>) {
  const isFullScreen = useSelector<RootState, boolean>(
    (state) => state.desktop.isActiveAppFullScreen
  );

  if (isFullScreen) {
    return (
      <AppDesktopLayoutFullscreen
        title={title}
        bgColor={bgColor}
        onClose={onClose}
      >
        {children}
      </AppDesktopLayoutFullscreen>
    );
  } else {
    return (
      <AppDesktopLayoutWindowed
        dragConstraintRef={dragConstraintRef}
        title={title}
        bgColor={bgColor}
        onClose={onClose}
        noPadding={noPadding}
      >
        {children}
      </AppDesktopLayoutWindowed>
    );
  }
}
