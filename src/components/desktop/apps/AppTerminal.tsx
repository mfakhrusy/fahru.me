import { Terminal } from "@/components/shared/Terminal";
import { Flex, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AppLayout } from "./AppLayout";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export function AppTerminal({ onClose, isOpen }: Props) {
  const [shouldRenderTerminal, setShouldRenderTerminal] = useState(false);
  const [isClosingDown, setIsClosingDown] = useState(false);

  useEffect(() => {
    setTimeout(() => setShouldRenderTerminal(true), 700);
  }, []);

  useEffect(() => {
    if (isClosingDown) {
      setTimeout(() => onClose(), 100);
    }
  }, [isClosingDown]);

  return (
    <AppLayout
      title="Terminal"
      onClose={() => setIsClosingDown(true)}
      isOpen={isOpen}
    >
      <Flex w="100%" h="100%" bgColor="black" color="white" p={1}>
        {shouldRenderTerminal ? (
          !isClosingDown && <Terminal withHelp={true} />
        ) : (
          <Text fontFamily="DOS VGA">Loading...</Text>
        )}
      </Flex>
    </AppLayout>
  );
}
