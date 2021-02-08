import { Flex, IconButton, Modal, ModalContent, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { PropsWithChildren } from "react";

type Props = {
  title: string;
  onClose: () => void;
};

export function AppLayout({
  title,
  children,
  onClose,
}: PropsWithChildren<Props>) {
  return (
    <Modal
      onClose={onClose}
      isOpen={true}
      size="full"
      styleConfig={{ marginTop: 0 }}
    >
      <ModalContent>
        <Flex flexDir="column" w="100%" h="100%">
          <Flex pos="relative" bgColor="#5a595c" h="30px" w="100%">
            <Text
              flexGrow={1}
              textAlign="center"
              alignItems="center"
              justifyContent="center"
              color="aliceblue"
              pt="2px"
            >
              {title}
            </Text>
            <IconButton
              icon={<CloseIcon w="15px" h="15px" />}
              aria-label={`Close ${title} Icon`}
              onClick={onClose}
              w="30px"
              maxW="30px"
              minW="30px"
              h="30px"
              borderRadius="0"
            />
          </Flex>
          <Flex
            borderBottom="1px solid #5a595c"
            borderRight="1px solid #5a595c"
            borderLeft="1px solid #5a595c"
            h="100%"
            w="100%"
          >
            {children}
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
}
