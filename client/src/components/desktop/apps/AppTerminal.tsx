import { Flex, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppLayout } from "@/components/desktop/apps/layout/AppLayout";
import { Terminal } from "@/components/shared/Terminal";
import type { App } from "@/lib/apps/apps";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";
import useIsTouchDevice from "@/lib/useIsTouchDevice";
import {
  setActiveDesktopApp as setActiveDesktopAppAction,
  SetActiveDesktopAppAction,
} from "@/store/desktop";

export function AppTerminal() {
  const dispatch = useDispatch();
  const isTouchDevice = useIsTouchDevice();
  const [isClosingDown, setIsClosingDown] = useState(false);

  const setActiveDesktopApp = useCallback<
    (args: App) => SetActiveDesktopAppAction
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
      isScrollable={false}
      noPadding
      bgColor="black"
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
