import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Divider, Flex, Heading, Image, Text, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AppLayout } from "./AppLayout";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export function AppProjects({ onClose, isOpen }: Props) {
  const [shouldRenderContent, setshouldRenderContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setshouldRenderContent(true), 150);
  }, []);

  return (
    <AppLayout
      title="Projects"
      onClose={onClose}
      isOpen={isOpen}
      bgColor="white"
    >
      <Flex
        w="100%"
        h="auto"
        minH="calc(100vh - 30px)"
        flexDir="column"
        alignItems="center"
      >
        {shouldRenderContent && (
          <>
            <Text>Past & current projects</Text>
            <Divider mt={4} mb={4} />
            <Heading size="sm" as="h1" mb={4}>
              Mathematic Hub: Equation Visualizer
            </Heading>
            <Image
              src="/images/eq-vis-math-hub-demo.png"
              maxW={{ base: "90%", md: "70%" }}
              h="auto"
              mb={3}
            />
            <Link
              href="https://github.com/mfakhrusy/math-hub"
              textDecor="underline"
              mb={3}
              target="_blank"
            >
              GitHub <ExternalLinkIcon />
            </Link>
            <Link
              href="https://mathematic-hub.fakhrusy.com/tools/equation-visualizer"
              textDecor="underline"
              mb={3}
              target="_blank"
            >
              Demo <ExternalLinkIcon />
            </Link>
            <Flex maxW="700px" flexDir="column">
              <Text>
                I built a math expression (function) visualizer in typescript,
                react, and mathjs.
              </Text>
              <Text>
                This is part of my ongoing project of mathematic learning
                platform (mathematic-hub), stay tune!
              </Text>
            </Flex>
          </>
        )}
      </Flex>
    </AppLayout>
  );
}
