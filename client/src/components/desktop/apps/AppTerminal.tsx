import { Flex, Text } from "@chakra-ui/react";
import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppLayout } from "@/components/desktop/apps/layout/AppLayout";
import { Terminal } from "@/components/shared/Terminal";
import type { DesktopApp } from "@/lib/desktop/desktop";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";
import useIsTouchDevice from "@/lib/useIsTouchDevice";
import {
  setActiveDesktopApp as setActiveDesktopAppAction,
  SetActiveDesktopAppAction,
} from "@/store/desktop";

type Props = {
  isOpen: boolean;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export function AppTerminal({ isOpen, dragConstraintRef }: Props) {
  const dispatch = useDispatch();
  const isTouchDevice = useIsTouchDevice();
  const [isClosingDown, setIsClosingDown] = useState(false);

  const setActiveDesktopApp = useCallback<
    (args: DesktopApp) => SetActiveDesktopAppAction
  >((payload) => dispatch(setActiveDesktopAppAction(payload)), [dispatch]);

  const onClose = useCallback(
    () => setActiveDesktopApp("DesktopMainView"),
    [setActiveDesktopApp]
  );

  const shouldRenderTerminal = useDelayRenderOnTouchDevice({
    delayAmount: 300,
  });

  useEffect(() => {
    if (isClosingDown) {
      if (isTouchDevice) {
        setTimeout(() => onClose(), 100);
      } else {
        onClose();
      }
    }
  }, [isClosingDown, isTouchDevice, onClose]);

  return (
    <AppLayout
      title="Terminal"
      onClose={() => setIsClosingDown(true)}
      isOpen={isOpen}
      isScrollable={false}
      noPadding
      bgColor="black"
      dragConstraintRef={dragConstraintRef}
    >
      <Flex color="white" overflow="hidden" p={2}>
        {shouldRenderTerminal ? (
          !isClosingDown && <Terminal withHelp={true} />
        ) : (
          <Text fontFamily="DOS VGA">Loading...</Text>
        )}
      </Flex>
    </AppLayout>
  );
}
