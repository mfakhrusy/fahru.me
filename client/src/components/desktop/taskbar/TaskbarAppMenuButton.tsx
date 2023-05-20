import { Image } from "@chakra-ui/image";
import { Divider, Flex, Text } from "@chakra-ui/layout";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { setFocusedDesktopApp } from "@/store/desktop";
import { type TaskbarState, setTaskbarMenu } from "@/store/taskbar";

export function TaskbarAppMenuButton() {
  const dispatch = useDispatch();
  const taskbarMenu = useSelector<RootState, TaskbarState["taskbarMenu"]>(
    (state) => state.taskbar.taskbarMenu
  );

  const handleClick = useCallback(() => {
    dispatch(setFocusedDesktopApp("DesktopMainView"));

    taskbarMenu === "AppMenu"
      ? dispatch(setTaskbarMenu())
      : dispatch(setTaskbarMenu("AppMenu"));
  }, [dispatch, taskbarMenu]);

  return (
    <>
      <Flex
        alignItems="center"
        cursor="pointer"
        _hover={{ bgColor: "debian.600" }}
        justifyContent="space-between"
        onClick={handleClick}
        bgColor={taskbarMenu === "AppMenu" ? "debian.600" : "debian.500"}
      >
        <Image
          src="/icons/app-other.png"
          w="2.18rem"
          h="1.55rem"
          pr={2}
          alt="Application List"
        />
        <Text fontSize="15px" mr={2} userSelect="none">
          Applications
        </Text>
      </Flex>
      <Divider orientation="vertical" mr={1} />
    </>
  );
}
