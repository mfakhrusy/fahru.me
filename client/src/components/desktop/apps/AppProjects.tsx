import { AppLayout } from "@/components/desktop/apps/AppLayout";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Divider, Flex, Heading, Image, Text, Link } from "@chakra-ui/react";
import { MutableRefObject } from "react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export function AppProjects({ onClose, isOpen, dragConstraintRef }: Props) {
  const shouldRenderContent = useDelayRenderOnTouchDevice({ delayAmount: 150 });

  return (
    <AppLayout
      title="Hobby Projects"
      onClose={onClose}
      isOpen={isOpen}
      dragConstraintRef={dragConstraintRef}
    >
      <Flex flexDir="column" alignItems="center">
        {shouldRenderContent && (
          <>
            <Text>My Hobby Projects</Text>
            <Divider mt={4} mb={4} />
            <Heading size="sm" as="h1">
              <Text mb={4}>Mathematic Hub: Equation Visualizer</Text>
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
