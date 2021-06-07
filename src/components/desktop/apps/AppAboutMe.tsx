import { AppLayout } from "@/components/desktop/apps/AppLayout";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";
import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { MutableRefObject } from "react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export function AppAboutMe({ onClose, isOpen, dragConstraintRef }: Props) {
  const shouldRenderContent = useDelayRenderOnTouchDevice({ delayAmount: 150 });

  return (
    <AppLayout
      title="About Me"
      onClose={onClose}
      isOpen={isOpen}
      dragConstraintRef={dragConstraintRef}
    >
      {shouldRenderContent && (
        <>
          <Text fontWeight="bold">About me</Text>
          <Text>Fahru, Indonesia</Text>
          <Box minH="16px" />
          <Text fontWeight="bold">What I do</Text>
          <Text>
            Software Engineer, end to end, strong at frontend currently
          </Text>
          <Box minH="16px" />
          <Text fontWeight="bold">Tech stacks I worked on</Text>
          <UnorderedList>
            <ListItem>Web stack: HTML5, CSS3, Javascript</ListItem>
            <ListItem>Typescript</ListItem>
            <ListItem>ReasonML</ListItem>
            <ListItem>ReactJS</ListItem>
            <ListItem>Node</ListItem>
            <ListItem>PostgreSQL</ListItem>
          </UnorderedList>
          <Box minH="16px" />
          <Text fontWeight="bold">Other skills</Text>
          <UnorderedList>
            <ListItem>Basic Azure cloud</ListItem>
            <ListItem>CI with gitlab CI or azure devops </ListItem>
            <ListItem>Platform as a service (e.g vercel) </ListItem>
            <ListItem>Linux web server (nginx/apache) config</ListItem>
            <ListItem>DNS config</ListItem>
            <ListItem>Web animation & SVGs</ListItem>
            <ListItem>Docker</ListItem>
            <ListItem>Semantic HTML</ListItem>
          </UnorderedList>
          <Box minH="16px" />
          <Text fontWeight="bold">My take on software engineering</Text>
          <UnorderedList>
            <ListItem>problem solving at its core</ListItem>
            <ListItem>maintainable and readable code is important</ListItem>
            <ListItem>pragmatism on tight deadline</ListItem>
            <ListItem>programming language is just a tool</ListItem>
          </UnorderedList>
          <Box minH="16px" />
          <Text fontWeight="bold">Hobbies</Text>
          <UnorderedList>
            <ListItem>
              Writing, mostly on twitter but I'm preparing a blog!
            </ListItem>
            <ListItem>
              Building something for the web. Indie hacker? maybe.
            </ListItem>
            <ListItem>
              Learning (yep, learning as a hobby). Math, Science, and Space
              stuffs, don't "<Text as="b">math and space IS science</Text>" me.
            </ListItem>
            <ListItem>
              Reading. Articles on the web & cool stuffs on twitter, still
              working on developing reading books as a habit
            </ListItem>
            <ListItem>
              Open source things. I am a linux geek (debian FTW) and I was into
              linux so hard until I realized I have a toddler to feed
            </ListItem>
          </UnorderedList>
        </>
      )}
    </AppLayout>
  );
}
