import type { BackgroundProps } from "@chakra-ui/styled-system";
import { type PropsWithChildren, useContext } from "react";
import { useSelector } from "react-redux";
import { AppDesktopLayoutFullscreen } from "@/components/desktop/apps/layout/AppDesktopLayoutFullscreen";
import { AppDesktopLayoutWindowed } from "@/components/desktop/apps/layout/AppDesktopLayoutWindowed";
import { DragContext } from "@/context/DragContext";
import type { RootState } from "@/store";

type AppDesktopLayoutProps = {
  title: string;
  bgColor?: BackgroundProps["bgColor"];
  onClose: () => void;
  noPadding?: boolean;
};

export function AppDesktopLayout({
  children,
  bgColor,
  title,
  onClose,
  noPadding = false,
}: PropsWithChildren<AppDesktopLayoutProps>) {
  const dragConstraintRef = useContext(DragContext);
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
