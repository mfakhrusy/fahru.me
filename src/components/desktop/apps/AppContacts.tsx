import {
  Box,
  Flex,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AppLayout } from "./AppLayout";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export function AppContacts({ onClose, isOpen }: Props) {
  const [shouldRenderContent, setshouldRenderContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setshouldRenderContent(true), 150);
  }, []);

  return (
    <AppLayout
      title="Contacts"
      onClose={onClose}
      isOpen={isOpen}
      bgColor="white"
    >
      <Flex w="100%" h="auto" minH="calc(100vh - 30px)" flexDir="column">
        {shouldRenderContent && (
          <>
            <Text fontWeight="bold">Email</Text>
            <Link
              href="mailto:fakhrusy.m@gmail.com"
              target="_blank"
              outline="none"
            >
              fakhrusy.m@gmail.com
            </Link>
            <Box minH="16px" />
            <Text fontWeight="bold">Twitter</Text>
            <Link
              href="https://twitter.com/f_fakhrusy"
              target="_blank"
              outline="none"
            >
              @f_fakhrusy
            </Link>
            <Box minH="16px" />
          </>
        )}
      </Flex>
    </AppLayout>
  );
}
