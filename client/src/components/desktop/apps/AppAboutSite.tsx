import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Link, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import type { MutableRefObject } from "react";
import { AppLayout } from "@/components/desktop/apps/layout/AppLayout";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export function AppAboutSite({ onClose, isOpen, dragConstraintRef }: Props) {
  const shouldRenderContent = useDelayRenderOnTouchDevice({ delayAmount: 150 });

  return (
    <AppLayout
      title="About Site"
      onClose={onClose}
      isOpen={isOpen}
      dragConstraintRef={dragConstraintRef}
    >
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
            href="https://github.com/mfakhrusy/fahru.me"
          >
            https://github.com/mfakhrusy/fahru.me <ExternalLinkIcon />
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
              Moka Icons <ExternalLinkIcon />
            </Link>
            &nbsp;by&nbsp;
            <Link
              textDecor="underline"
              target="_blank"
              href="https://samuelhewitt.com"
            >
              Sam Hewitt <ExternalLinkIcon />
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
              CC-SA-4.0 <ExternalLinkIcon />
            </Link>
          </Text>
          <Box minH={4} />
          <Text fontWeight="bold">Background</Text>
          <Text>
            <Link
              textDecor="underline"
              target="_blank"
              href="https://github.com/PineAndApplePizza/open-wallpapers/"
            >
              GitHub <ExternalLinkIcon />
            </Link>
            &nbsp;by&nbsp; PineAndApplePizza
          </Text>
          <Box minH={4} />
          <Text>
            licensed under&nbsp;
            <Link
              textDecor="underline"
              target="_blank"
              href="https://www.gnu.org/licenses/gpl-3.0.html"
            >
              GPL <ExternalLinkIcon />
            </Link>
          </Text>
          <Text>
            original logo creator&nbsp;
            <Link
              textDecor="underline"
              target="_blank"
              href="https://www.reddit.com/user/Ishaan_P/"
            >
              u/Ishaan_P <ExternalLinkIcon />
            </Link>
          </Text>
        </>
      )}
    </AppLayout>
  );
}
