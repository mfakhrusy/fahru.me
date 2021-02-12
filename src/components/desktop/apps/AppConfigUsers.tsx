import { Box, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { AppLayout } from "./AppLayout";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export function AppConfigUsers({onClose, isOpen}: Props) {
  return (
    <AppLayout
      title="About Me"
      onClose={onClose}
      isOpen={isOpen}
    >
      <Flex bgColor="white" w="100%" h="auto" minH="calc(100vh - 30px)" flexDir="column" pl={3} pr={3} pt={2} pb={2}>
        <Text fontWeight="bold">About me</Text>
        <Text>Fahru, Indonesia</Text>
        <Box minH="16px" />
        <Text fontWeight="bold">What I do</Text>
        <Text>Software Engineer, end to end, frontend strong</Text>
        <Box minH="16px" />
        <Text fontWeight="bold">My stacks, currently:</Text>
        <UnorderedList>
          <ListItem>Web stack: HTML5, CSS3, Javascript</ListItem>
          <ListItem>Typescript</ListItem>
          <ListItem>ReasonML</ListItem>
          <ListItem>ReactJS</ListItem>
          <ListItem>Node</ListItem>
          <ListItem>PostgreSQL</ListItem>
          <ListItem>Basic cloud (AWS/Azure)</ListItem>
          <ListItem>easily learn others depending on the problem</ListItem>
        </UnorderedList>
        <Box minH="16px" />
        <Text fontWeight="bold">Other skills:</Text>
        <UnorderedList>
          <ListItem>CI with gitlab CI or azure devops </ListItem>
          <ListItem>Platform as a service (e.g vercel) </ListItem>
          <ListItem>Linux web server (nginx/apache) config</ListItem>
          <ListItem>DNS config</ListItem>
          <ListItem>Web animation & SVGs</ListItem>
          <ListItem>Semantic HTML</ListItem>
        </UnorderedList>
        <Box minH="16px" />
        <Text fontWeight="bold">My take on software engineering</Text>
        <UnorderedList>
          <ListItem>problem solving at its core</ListItem>
          <ListItem>maintainable and readable code is important</ListItem>
          <ListItem>pragmatism on tight deadline</ListItem>
          <ListItem>programming language is just a tool</ListItem>
          <ListItem>strong type unless you can't</ListItem>
        </UnorderedList>
        <Box minH="16px" />
      </Flex>
    </AppLayout>
  );
}
