import { Box, Flex, Input, Text } from "@chakra-ui/react";

type Props = {
  usernameHistory: Array<string>;
};

export function IncorrectLogin({ usernameHistory }: Props) {
  return (
    <>
      {usernameHistory.map((username, index) => {
        return (
          <Flex flexDir="column" key={index}>
            <Box h={4} />
            <Flex alignItems="center">
              <Text as="label" mr={2} whiteSpace="nowrap">
                fakhrusy.com login:
              </Text>
              <Input
                variant="flushed"
                borderBottomColor="black"
                _focus={{ borderBottomColor: "black" }}
                value={username}
                disabled={true}
              />
            </Flex>
            <Flex alignItems="center">
              <Text as="label" mr={2}>
                Password:
              </Text>
              <Flex flexGrow={1}>
                <Input
                  style={{ caretColor: "white" }}
                  color="black"
                  variant="flushed"
                  w="1px"
                  borderBottomColor="black"
                  _focus={{ borderBottomColor: "black" }}
                  disabled={true}
                />
              </Flex>
            </Flex>
            <Text>Login incorrect</Text>
          </Flex>
        );
      })}
    </>
  );
}
