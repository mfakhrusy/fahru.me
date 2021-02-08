import { IncorrectLogin } from "@/components/tty/IncorrectLogin";
import { LoginForm } from "@/components/tty/LoginForm";
import { Box, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const title = String.raw`
  /$$$$$$          /$$       /$$                                                                                    
 /$$__  $$        | $$      | $$                                                                                    
| $$  \__//$$$$$$ | $$   /$$| $$$$$$$   /$$$$$$  /$$   /$$  /$$$$$$$ /$$   /$$      /$$$$$$$  /$$$$$$  /$$$$$$/$$$$ 
| $$$$   |____  $$| $$  /$$/| $$__  $$ /$$__  $$| $$  | $$ /$$_____/| $$  | $$     /$$_____/ /$$__  $$| $$_  $$_  $$
| $$_/    /$$$$$$$| $$$$$$/ | $$  \ $$| $$  \__/| $$  | $$|  $$$$$$ | $$  | $$    | $$      | $$  \ $$| $$ \ $$ \ $$
| $$     /$$__  $$| $$_  $$ | $$  | $$| $$      | $$  | $$ \____  $$| $$  | $$    | $$      | $$  | $$| $$ | $$ | $$
| $$    |  $$$$$$$| $$ \  $$| $$  | $$| $$      |  $$$$$$/ /$$$$$$$/|  $$$$$$$ /$$|  $$$$$$$|  $$$$$$/| $$ | $$ | $$
|__/     \_______/|__/  \__/|__/  |__/|__/       \______/ |_______/  \____  $$|__/ \_______/ \______/ |__/ |__/ |__/
                                                                     /$$  | $$                                      
                                                                    |  $$$$$$/                                      
                                                                     \______/                                               
`;

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
    <Flex
      w="100vw"
      h="100vh"
      bgColor="black"
      p="10px"
      flexDir="column"
      color="white"
      fontFamily="DOS VGA"
      height="auto"
      minHeight="100vh"
    >
      <Box as="pre" fontSize={{ base: "4px", sm: "6px", md: "11px" }}>
        {title}
      </Box>
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
    </Flex>
  );
}
