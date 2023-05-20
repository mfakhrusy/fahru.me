import { Flex, Text } from "@chakra-ui/layout";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import height from "@/lib/height";
import zIndex from "@/lib/zIndex";
import { RootState } from "@/store";
import { TaskbarState } from "@/store/taskbar";

export function TaskbarTimeWidget() {
  const currentTime = useSelector<RootState, string>(
    (state) => state.desktop.currentTime
  );

  const taskbarMenu = useSelector<RootState, TaskbarState["taskbarMenu"]>(
    (state) => state.taskbar.taskbarMenu
  );

  return (
    <Flex
      color="debian.500"
      pos="absolute"
      top={taskbarMenu === "TimeWidget" ? height.taskbar : "-100vh"}
      right={0}
      zIndex={zIndex.timeWidget}
      flexDir="column"
      bgColor="white"
      userSelect="none"
    >
      <Flex>
        <Flex flexDir="column" p="0 1rem">
          <Text fontSize="4rem" mb="-10px" mt="-5px">
            {format(parseISO(currentTime), "HH:mm:ss")}
          </Text>
          <Text
            fontSize="1rem"
            display="flex"
            alignItems="center"
            mb={4}
            pl="5px"
          >
            {format(parseISO(currentTime), "cccc, d LLLL yyyy")}
          </Text>
        </Flex>
      </Flex>
      <Calendar value={parseISO(currentTime)} />
    </Flex>
  );
}
