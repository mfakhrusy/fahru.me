import { AppLayout } from "@/components/desktop/apps/AppLayout";
import { Terminal } from "@/components/shared/Terminal";
import useIsTouchDevice from "@/lib/useIsTouchDevice";
import { Flex, Text } from "@chakra-ui/react";
import { MutableRefObject, useEffect, useState } from "react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export function AppTerminal({ onClose, isOpen, dragConstraintRef }: Props) {
  const isTouchDevice = useIsTouchDevice();
  const [shouldRenderTerminal, setShouldRenderTerminal] = useState(false);
  const [isClosingDown, setIsClosingDown] = useState(false);

  useEffect(() => {
    if (isTouchDevice) {
      setTimeout(() => setShouldRenderTerminal(true), 300);
    } else {
      setShouldRenderTerminal(true);
    }
  }, []);

  useEffect(() => {
    if (isClosingDown) {
      if (isTouchDevice) {
        setTimeout(() => onClose(), 100);
      } else {
        onClose();
      }
    }
  }, [isClosingDown]);

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
