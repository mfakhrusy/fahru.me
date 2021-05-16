import {
  DesktopApp,
  desktopApp,
  makeDesktopIcons,
} from "@/lib/desktop/desktop";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Ref, useCallback } from "react";
import {
  SetActiveDesktopAppAction,
  setActiveDesktopApp as setActiveDesktopAppAction,
  disableAppMenu as disableAppMenuAction,
} from "@/store/desktop";
import { useDispatch } from "react-redux";

type Props = {
  isActive: boolean;
  forwardRef: Ref<HTMLDivElement>;
};

export function DesktopAppMenu({ isActive, forwardRef }: Props) {
  const dispatch = useDispatch();

  const setActiveDesktopApp = useCallback<
    (args: DesktopApp) => SetActiveDesktopAppAction
  >((payload) => dispatch(setActiveDesktopAppAction(payload)), []);

  const disableAppMenu = useCallback<() => void>(
    () => dispatch(disableAppMenuAction()),
    []
  );

  return (
    <Flex
      ref={forwardRef}
      w="400px"
      minH="150px"
      position="absolute"
      top="45px"
      zIndex="2"
      backgroundColor="#8e738d"
      color="white"
      p={4}
      visibility={isActive ? "visible" : "hidden"}
      borderRight="1px solid rgba(0, 0, 0, 0.1)"
      borderBottom="1px solid rgba(0, 0, 0, 0.1)"
    >
      <Flex w="40%" borderRight="1px solid rgba(0, 0, 0, 0.1)" pt={2}>
        All
      </Flex>
      <Flex w="60%" flexDir="column" pl={2}>
        {desktopApp
          .filter((app) => app !== "DesktopMainView")
          .map((app) => {
            const appIconName = makeDesktopIcons().filter(
              (item) => item.appName === app
            )[0]?.iconName;

            const appTitle = makeDesktopIcons().filter(
              (item) => item.appName === app
            )[0]?.title;

            return (
              <Flex
                key={app}
                alignItems="center"
                p={2}
                _hover={{ bgColor: "#7f677f" }}
                borderRadius="5px"
                cursor="pointer"
                onClick={() => {
                  disableAppMenu();
                  setActiveDesktopApp(app);
                }}
              >
                <Image src={`/icons/${appIconName}`} w="30px" h="30px" />
                <Box w={2} />
                <Text userSelect="none">{appTitle}</Text>
              </Flex>
            );
          })}
      </Flex>
    </Flex>
  );
}
