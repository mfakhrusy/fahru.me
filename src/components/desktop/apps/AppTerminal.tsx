import { Terminal } from "@/components/shared/Terminal";
import { Flex } from "@chakra-ui/react";
import { AppLayout } from "./AppLayout";

type Props = {
  onClose: () => void;
};

export function AppTerminal({ onClose }: Props) {
  return (
    <AppLayout title="Terminal" onClose={onClose}>
      <Flex w="100%" h="100%" bgColor="black" color="white">
        <Terminal />
      </Flex>
    </AppLayout>
  );
}
