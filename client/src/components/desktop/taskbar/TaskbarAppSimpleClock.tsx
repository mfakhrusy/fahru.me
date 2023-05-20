import { Divider, Flex, Text } from "@chakra-ui/layout";
import styled from "@emotion/styled";
import { format, parseISO } from "date-fns";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { TaskbarState, setTaskbarMenu } from "@/store/taskbar";

const TextContainer = styled(Text)`
  animation: blinker 1s step-start infinite;

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;

export function TaskbarAppSimpleClock() {
  const dispatch = useDispatch();

  const currentTime = useSelector<RootState, string>(
    (state) => state.desktop.currentTime
  );

  const taskbarMenu = useSelector<RootState, TaskbarState["taskbarMenu"]>(
    (state) => state.taskbar.taskbarMenu
  );

  const handleClick = useCallback(() => {
    if (taskbarMenu === "TimeWidget") {
      dispatch(setTaskbarMenu());
    } else {
      dispatch(setTaskbarMenu("TimeWidget"));
    }
  }, [dispatch, taskbarMenu]);

  return (
    <Flex
      alignItems="center"
      pr={4}
      cursor="pointer"
      userSelect="none"
      onClick={handleClick}
    >
      <Divider orientation="vertical" mx={4} />
      <Text display="inline">{format(parseISO(currentTime), "HH")}</Text>
      <TextContainer display="inline" mb="4px" mr="1px" ml="1px">
        :
      </TextContainer>
      <Text display="inline">{format(parseISO(currentTime), "mm")}</Text>
    </Flex>
  );
}
