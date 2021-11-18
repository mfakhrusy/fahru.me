import { AppLayout } from "@/components/desktop/apps/AppLayout";
import { InlineLink } from "@/components/shared/InlineLink";
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
          <Text>Fahru, Baltimore, MD, USA</Text>
          <Text>Origin: Indonesia</Text>
          <Box minH="16px" />
          <Text fontWeight="bold">What I do</Text>
          <Text>Software Engineer. Tinkerer. Hacker.</Text>
          <Box minH="16px" />
          <Text fontWeight="bold">Tech stacks I worked on</Text>
          <UnorderedList>
            <ListItem>Web stacks: HTML5, CSS3, Javascript</ListItem>
            <ListItem>Typescript</ListItem>
            <ListItem>ReasonML</ListItem>
            <ListItem>React</ListItem>
            <ListItem>NodeJS</ListItem>
            <ListItem>PostgreSQL</ListItem>
          </UnorderedList>
          <Box minH="16px" />
          <Text fontWeight="bold">Other skills</Text>
          <UnorderedList>
            <ListItem>Basic Azure cloud</ListItem>
            <ListItem>
              CI/CD with Gitlab CI, Azure devops, and GitHub Action{" "}
            </ListItem>
            <ListItem>Linux web server (nginx/apache) config</ListItem>
            <ListItem>DNS config</ListItem>
            <ListItem>Web animation & SVGs</ListItem>
            <ListItem>Docker</ListItem>
          </UnorderedList>
          <Box minH="16px" />
          <Text fontWeight="bold">Currently interested about:</Text>
          <UnorderedList>
            <ListItem>Web Assembly with either Rust/C++</ListItem>
            <ListItem>Building graphic-intensive web application</ListItem>
            <ListItem>Cyber Security (especially CTF)</ListItem>
            <ListItem>
              etc... follow me on{" "}
              <InlineLink href="https://twitter.com/f_fakhrusy">
                twitter
              </InlineLink>
              to find out!
            </ListItem>
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
            <ListItem>Learning stuffs. Anything, really.</ListItem>
            <ListItem>Writing. I'm preparing a blog!</ListItem>
            <ListItem>
              Building something cool. Tinkering about stuffs.
            </ListItem>
            <ListItem>
              Reading articles on the web & cool stuffs on twitter, still
              working on developing reading books as a habit.
            </ListItem>
          </UnorderedList>
        </>
      )}
    </AppLayout>
  );
}
