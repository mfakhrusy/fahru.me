import { Flex, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

type Props = {
  setUsernameHistory: (value: string) => void;
};

export function LoginForm({ setUsernameHistory }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const router = useRouter();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (username === "Guest" && password === "Guest") {
          router.push("/home");
        } else {
          setUsername("");
          setPassword("");
          setUsernameHistory(username);
          usernameRef.current.focus();
        }
      }
    };

    window.addEventListener("keypress", eventHandler);

    return () => window.removeEventListener("keypress", eventHandler);
  });

  return (
    <Flex flexDir="column">
      <Flex alignItems="center">
        <Text as="label" mr={2} whiteSpace="nowrap">
          fakhrusy.com login:
        </Text>
        <Input
          variant="flushed"
          borderBottomColor="black"
          _focus={{ borderBottomColor: "black" }}
          ref={usernameRef}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </Flex>
      <Flex alignItems="center">
        <Text as="label" mr={2}>
          Password:
        </Text>
        <Flex
          flexGrow={1}
          onClick={() => {
            passwordRef.current.focus();
          }}
          cursor="text"
        >
          <Input
            style={{ caretColor: "white" }}
            color="black"
            variant="flushed"
            w="1px"
            borderBottomColor="black"
            _focus={{ borderBottomColor: "black" }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            ref={passwordRef}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
