import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  type App,
  makeLocalApps,
  makeMarkdownBasedApps,
} from "@/lib/apps/apps";
import height from "@/lib/height";
import zIndex from "@/lib/zIndex";
import type { RootState } from "@/store";
import {
  type SetActiveDesktopAppAction,
  setActiveDesktopApp as setActiveDesktopAppAction,
  setModal as setModalAction,
  type SetModalAction,
  type ModalState,
} from "@/store/desktop";
import { type TaskbarState, setTaskbarMenu } from "@/store/taskbar";

export function TaskbarAppMenu() {
  const dispatch = useDispatch();

  const setActiveDesktopApp = useCallback<
    (args: App) => SetActiveDesktopAppAction
  >((payload) => dispatch(setActiveDesktopAppAction(payload)), [dispatch]);

  const setModal = useCallback<(args: ModalState) => SetModalAction>(
    (payload) => dispatch(setModalAction(payload)),
    [dispatch]
  );

  const taskbarMenu = useSelector<RootState, TaskbarState["taskbarMenu"]>(
    (state) => state.taskbar.taskbarMenu
  );

  return (
    <Flex
      w="400px"
      minH="150px"
      position="absolute"
      top={height.taskbar}
      zIndex={zIndex.appMenu}
      backgroundColor="debian.500"
      color="white"
      p={4}
      visibility={taskbarMenu === "AppMenu" ? "visible" : "hidden"}
      borderRight="1px solid rgba(0, 0, 0, 0.1)"
      borderBottom="1px solid rgba(0, 0, 0, 0.1)"
      flexDir="column"
    >
      <Flex>
        <Flex w="40%" borderRight="1px solid rgba(0, 0, 0, 0.1)" pt={2}>
          All
        </Flex>
        <Flex w="60%" flexDir="column" pl={2}>
          {makeLocalApps().map((app) => {
            return (
              <Flex
                key={app.appName}
                alignItems="center"
                p={2}
                _hover={{ bgColor: "debian.600" }}
                borderRadius="5px"
                cursor="pointer"
                onClick={() => {
                  dispatch(setTaskbarMenu());
                  setActiveDesktopApp(app.appName);
                }}
              >
                <Image
                  src={`/icons/${app.iconName}`}
                  w="30px"
                  h="30px"
                  alt={app.title}
                />
                <Box w={2} />
                <Text userSelect="none">{app.title}</Text>
              </Flex>
            );
          })}
          {makeMarkdownBasedApps().map((app) => {
            return (
              <Flex
                key={app.appName}
                alignItems="center"
                p={2}
                _hover={{ bgColor: "debian.600" }}
                borderRadius="5px"
                cursor="pointer"
                onClick={() => {
                  dispatch(setTaskbarMenu());
                  setActiveDesktopApp(app.appName);
                }}
              >
                <Image
                  src={`/icons/${app.iconName}`}
                  w="30px"
                  h="30px"
                  alt={app.title}
                />
                <Box w={2} />
                <Text userSelect="none">{app.title}</Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
      <Flex
        flexDir="column"
        borderTop="1px solid rgba(0, 0, 0, 0.1)"
        pt={3}
        mt={3}
      >
        <Flex
          _hover={{ bgColor: "debian.600" }}
          p={2}
          cursor="pointer"
          w="180px"
          borderRadius="10px"
          onClick={() => setModal("shutdownModal")}
          alignItems="center"
        >
          <Image src="/icons/shutdown.png" w="30px" h="30px" alt="Shutdown" />
          <Box w={2} />
          <Text userSelect="none">Shutdown</Text>
        </Flex>
        <Flex
          _hover={{ bgColor: "debian.600" }}
          p={2}
          cursor="pointer"
          w="180px"
          borderRadius="10px"
          onClick={() => setModal("rebootModal")}
          alignItems="center"
        >
          <Image src="/icons/restart.png" w="30px" h="30px" alt="Restart" />
          <Box w={2} />
          <Text userSelect="none">Reboot</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
