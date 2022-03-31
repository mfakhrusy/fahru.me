// CURRENTLY NOT IN USE
import { ASCIITitle } from "@/components/shared/ASCIITitle";
import { BlackTerminalPage } from "@/components/shared/BlackTerminalPage";
import { IncorrectLogin } from "@/components/tty/IncorrectLogin";
import { LoginForm } from "@/components/tty/LoginForm";
import { Box, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function LoginScreen() {
  const [date, setDate] = useState(new Date());
  const [usernameHistory, setUsernameHistory] = useState<Array<string>>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <BlackTerminalPage>
      <ASCIITitle />
      <Flex flexDir="column">
        <Text>guest account:</Text>
        <UnorderedList>
          <ListItem>Username: guest </ListItem>
          <ListItem>Password: guest </ListItem>
        </UnorderedList>
      </Flex>
      <Box as="pre">===================================</Box>
      <Flex>
        <Text color="red">{format(date, "EE MMM dd yyyy")}</Text>
        <Text color="purple" ml={2}>
          {format(date, "HH:mm:ss")}
        </Text>
      </Flex>
      <IncorrectLogin usernameHistory={usernameHistory} />
      <Box h={4} />
      <LoginForm
        setUsernameHistory={(value) =>
          setUsernameHistory((state) => [...state, value])
        }
      />
    </BlackTerminalPage>
  );
}
