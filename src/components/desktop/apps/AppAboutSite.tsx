import {
  Box,
  Flex,
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

export function AppAboutSite({ onClose, isOpen }: Props) {
  const [shouldRenderContent, setshouldRenderContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setshouldRenderContent(true), 150);
  }, []);

  return (
    <AppLayout
      title="About Site"
      onClose={onClose}
      isOpen={isOpen}
      bgColor="white"
    >
      <Flex flexDir="column" w="100%" h="auto" minH="calc(100vh - 30px)">
        {shouldRenderContent && (
          <>
            <Text fontWeight="bold">About site</Text>
            <Text>This is Fahru personal site</Text>
            <Box minH={4} />
            <Text fontWeight="bold">Source Code</Text>
            <Text>Available on github:</Text>
            <Link
              textDecor="underline"
              target="_blank"
              href="https://github.com/mfakhrusy/fakhrusy.com"
            >
              https://github.com/mfakhrusy/fakhrusy.com
            </Link>
            <Box minH={4} />
            <Text fontWeight="bold">Tech Stack & Libraries</Text>
            <UnorderedList>
              <ListItem>typescript</ListItem>
              <ListItem>reactJS</ListItem>
              <ListItem>nextJS</ListItem>
              <ListItem>vercel</ListItem>
              <ListItem>xtermjs</ListItem>
              <ListItem>chakra-ui</ListItem>
              <ListItem>framer-motion</ListItem>
            </UnorderedList>
            <Box minH={4} />
            <Text fontWeight="bold">Icons</Text>
            <Text>
              <Link
                textDecor="underline"
                target="_blank"
                href="https://snwh.org/moka"
              >
                Moka Icons
              </Link>
              &nbsp;by&nbsp;
              <Link
                textDecor="underline"
                target="_blank"
                href="https://samuelhewitt.com"
              >
                Sam Hewitt
              </Link>
            </Text>
            <Box minH={4} />
            <Text>
              licensed under&nbsp;
              <Link
                textDecor="underline"
                target="_blank"
                href="https://creativecommons.org/licenses/by-sa/4.0/"
              >
                CC-SA-4.0
              </Link>
            </Text>
          </>
        )}
      </Flex>
    </AppLayout>
  );
}
