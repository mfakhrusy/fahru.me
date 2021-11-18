import { Divider, Flex, Text } from "@chakra-ui/layout";
import styled from "@emotion/styled";
import { format } from "date-fns";
import { useState, useEffect } from "react";

const TextContainer = styled(Text)`
  animation: blinker 1s step-start infinite;

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;

export function DesktopAppSimpleClock() {
  const [now, setTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex ml="auto" alignItems="center" pr={4}>
      <Divider orientation="vertical" mr={4} />
      <Text display="inline">{format(now, "HH")}</Text>
      <TextContainer display="inline" mr="2px" ml="1px">
        :
      </TextContainer>
      <Text display="inline">{format(now, "mm")}</Text>
    </Flex>
  );
}
