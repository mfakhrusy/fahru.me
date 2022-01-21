import { AppLayout } from "@/components/desktop/apps/AppLayout";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Heading, Link, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { MutableRefObject } from "react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export function AppTodo({ onClose, isOpen, dragConstraintRef }: Props) {
  const shouldRenderContent = useDelayRenderOnTouchDevice({ delayAmount: 150 });

  return (
    <AppLayout
      title="To-Dos"
      onClose={onClose}
      isOpen={isOpen}
      dragConstraintRef={dragConstraintRef}
    >
      {shouldRenderContent && (
        <UnorderedList mt="10px">
          <Text fontSize="lg" mb="10px" ml="-1rem">
            Bunch of things that I want to implement in the future: (no promises
            and in no particular order!)
          </Text>
          <ListItem>
            Background image (and color theme) variations based on this&nbsp;
            <Link
              textDecor="underline"
              target="_blank"
              href="https://github.com/PineAndApplePizza/open-wallpapers/"
            >
              "cute" linux-y wallpapers&nbsp;
              <ExternalLinkIcon />
            </Link>
          </ListItem>
          <ListItem>
            <Link
              textDecor="underline"
              target="_blank"
              href="http://www.desktop-destroyer.net/"
            >
              Screen destroyer game <ExternalLinkIcon />
            </Link>
          </ListItem>
          <ListItem>Accessibility support (e.g. screen reader)</ListItem>
          <ListItem>
            Port Space Cadet Pinball to emscripten and integrate it here, see
            the&nbsp;
            <Link
              textDecor="underline"
              target="_blank"
              href="https://github.com/k4zmu2a/SpaceCadetPinball"
            >
              GitHub Repo <ExternalLinkIcon />
            </Link>
            .&nbsp;Someone already port it in emscripten but I want to do it
            myself as an exercise
          </ListItem>
          <ListItem>
            Implement multiple app window (with perfomance in mind) and add
            minimize capability for each window
          </ListItem>
          <ListItem>
            Custom right click on the screen (e.g. to enlarge icons)
          </ListItem>
        </UnorderedList>
      )}
    </AppLayout>
  );
}
