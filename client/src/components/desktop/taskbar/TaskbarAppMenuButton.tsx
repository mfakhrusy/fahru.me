import { Image } from "@chakra-ui/image";
import { Divider, Flex, Text } from "@chakra-ui/layout";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import type { DesktopApp } from "@/lib/desktop/desktop";
import type { RootState } from "@/store";
import {
  EnableAppMenuAction,
  enableAppMenu as enableAppMenuAction,
  disableAppMenu as disableAppMenuAction,
  setFocusedDesktopApp as setFocusedDesktopAppAction,
  type AppMenuState,
  SetFocusedDesktopAppAction,
} from "@/store/desktop";

type Props = {
  forwardRef: React.Ref<HTMLDivElement>;
};

export function TaskbarAppMenuButton({ forwardRef }: Props) {
  const dispatch = useDispatch();
  const appMenuState = useSelector<RootState, AppMenuState>(
    (state) => state.desktop.appMenu
  );

  const setFocusedDesktopApp = useCallback<
    (args: DesktopApp) => SetFocusedDesktopAppAction
  >((payload) => dispatch(setFocusedDesktopAppAction(payload)), [dispatch]);

  const enableAppMenu = useCallback<(args: DesktopApp) => EnableAppMenuAction>(
    (payload) => dispatch(enableAppMenuAction(payload)),
    [dispatch]
  );

  const disableAppMenu = useCallback<() => void>(
    () => dispatch(disableAppMenuAction()),
    [dispatch]
  );

  const onClick = () => {
    setFocusedDesktopApp("DesktopMainView");

    appMenuState.isActive ? disableAppMenu() : enableAppMenu("DesktopMainView");
  };

  return (
    <>
      <Flex
        alignItems="center"
        cursor="pointer"
        _hover={{ bgColor: "debian.600" }}
        justifyContent="space-between"
        onClick={onClick}
        bgColor={appMenuState.isActive ? "debian.600" : "debian.500"}
        ref={forwardRef}
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
