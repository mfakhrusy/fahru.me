import { Flex } from "@chakra-ui/react";
import { TaskbarAppMenu } from "@/components/desktop/taskbar/TaskbarAppMenu";
import { TaskbarAppMenuButton } from "@/components/desktop/taskbar/TaskbarAppMenuButton";
import { TaskbarAppSimpleClock } from "@/components/desktop/taskbar/TaskbarAppSimpleClock";
import { TaskbarTimeWidget } from "@/components/desktop/taskbar/TaskbarTimeWidget";
import { TaskbarWifiIcon } from "@/components/desktop/taskbar/TaskbarWifiIcon";
import height from "@/lib/height";
import zIndex from "@/lib/zIndex";

export function Taskbar() {
  return (
    <>
      <Flex
        h={height.taskbar}
        w="100%"
        bgColor="debian.500"
        color="white"
        borderBottom="1px solid rgba(0, 0, 0, 0.1)"
        zIndex={zIndex.taskbar}
        pos="relative"
      >
        <TaskbarAppMenuButton />
        <TaskbarWifiIcon />
        <TaskbarAppSimpleClock />
      </Flex>
      <TaskbarAppMenu />
      <TaskbarTimeWidget />
    </>
  );
}
