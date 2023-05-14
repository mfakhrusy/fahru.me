import { Flex, Text } from "@chakra-ui/react";
import { MutableRefObject, useEffect, useState } from "react";
import { AppLayout } from "@/components/desktop/apps/layout/AppLayout";
import { Terminal } from "@/components/shared/Terminal";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";
import useIsTouchDevice from "@/lib/useIsTouchDevice";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export function AppTerminal({ onClose, isOpen, dragConstraintRef }: Props) {
  const isTouchDevice = useIsTouchDevice();
  const [isClosingDown, setIsClosingDown] = useState(false);

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
