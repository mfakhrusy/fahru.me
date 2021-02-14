import { ExternalLinkIcon } from "@chakra-ui/icons";
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
            <Link href="mailto:fakhrusy.m@gmail.com" target="_blank">
              fakhrusy.m@gmail.com <ExternalLinkIcon />
            </Link>
            <Box minH="16px" />
            <Text fontWeight="bold">Twitter</Text>
            <Link href="https://twitter.com/f_fakhrusy" target="_blank">
              @f_fakhrusy <ExternalLinkIcon />
            </Link>
            <Box minH="16px" />
            <Text fontWeight="bold">GitHub</Text>
            <Link href="https://github.com/mfakhrusy/" target="_blank">
              mfakhrusy <ExternalLinkIcon />
            </Link>
            <Box minH="16px" />
            <Text fontWeight="bold">Stack Overflow</Text>
            <Link href="https://stackoverflow.com/users/5835100/mfakhrusy" target="_blank">
              mfakhrusy <ExternalLinkIcon />
            </Link>
            <Box minH="16px" />
            <Text fontWeight="bold">LinkedIn</Text>
            <Link
              href="https://www.linkedin.com/in/mfakhrusy/"
              target="_blank"
              outline="none"
            >
              Muhamad Fakhrusy <ExternalLinkIcon />
            </Link>
          </>
        )}
      </Flex>
    </AppLayout>
  );
}
