import height from "@/lib/height";
import zIndex from "@/lib/zIndex";
import { RootState } from "@/store";
import { Flex, Text } from "@chakra-ui/layout";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";

type Props = {
  forwardRef: React.Ref<HTMLDivElement>;
};

export function DesktopTimeWidget({ forwardRef }: Props) {
  const currentTime = useSelector<RootState, string>(
    (state) => state.desktop.currentTime
  );

  const isTimeWidgetActive = useSelector<RootState, boolean>(
    (state) => state.desktop.isTimeWidgetActive
  );

  return (
    <Flex
      color="primary.500"
      pos="absolute"
      top={isTimeWidgetActive ? height.taskbar : "-100vh"}
      right={0}
      zIndex={zIndex.timeWidget}
      ref={forwardRef}
      flexDir="column"
      bgColor="white"
    >
      <Flex>
        <Flex flexDir="column" p="0 1rem">
          <Text fontSize="4rem" mb="-10px" mt="-12px">
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
