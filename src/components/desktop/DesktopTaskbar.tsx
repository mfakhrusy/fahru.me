import { DesktopApp } from "@/lib/desktop/desktop";
import height from "@/lib/height";
import zIndex from "@/lib/zIndex";
import { RootState } from "@/store";
import styled from "@emotion/styled";
import {
  EnableAppMenuAction,
  enableAppMenu as enableAppMenuAction,
  disableAppMenu as disableAppMenuAction,
  setFocusedDesktopApp as setFocusedDesktopAppAction,
  AppMenuState,
  SetFocusedDesktopAppAction,
} from "@/store/desktop";
import { Divider, Flex, Image, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { Ref, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const TextContainer = styled(Text)`
  animation: blinker 1s step-start infinite;

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;

type Props = {
  forwardRef: Ref<HTMLDivElement>;
};

export function DesktopTaskbar({ forwardRef }: Props) {
  const dispatch = useDispatch();

  const appMenuState = useSelector<RootState, AppMenuState>(
    (state) => state.desktop.appMenu
  );

  const enableAppMenu = useCallback<(args: DesktopApp) => EnableAppMenuAction>(
    (payload) => dispatch(enableAppMenuAction(payload)),
    []
  );

  const disableAppMenu = useCallback<() => void>(
    () => dispatch(disableAppMenuAction()),
    []
  );

  const setFocusedDesktopApp = useCallback<
    (args: DesktopApp) => SetFocusedDesktopAppAction
  >((payload) => dispatch(setFocusedDesktopAppAction(payload)), []);

  const onClickApplications = () => {
    setFocusedDesktopApp("DesktopMainView");

    appMenuState.isActive ? disableAppMenu() : enableAppMenu("DesktopMainView");
  };

  return (
    <Flex
      h={height.taskbar}
      w="100%"
      bgColor="primary.500"
      color="white"
      p={1}
      borderBottom="1px solid rgba(0, 0, 0, 0.1)"
      ref={forwardRef}
      zIndex={zIndex.taskbar}
    >
      <Flex
        alignItems="center"
        cursor="pointer"
        p={1}
        _hover={{ bgColor: "#7f677f" }}
        borderRadius="5px"
        justifyContent="space-between"
        onClick={onClickApplications}
        bgColor={appMenuState.isActive ? "primary.600" : "primary.500"}
      >
        <Image src="/icons/app-other.png" w={10} h={8} pr={2} />
        <Text mr={2} userSelect="none">
          Applications
        </Text>
      </Flex>
      <Divider orientation="vertical" ml={1} mr={1} />
      <Flex ml="auto" alignItems="center" pr={4}>
        <Divider orientation="vertical" mr={4} />
        <Text display="inline">{format(new Date(), "HH")}</Text>
        <TextContainer display="inline" mr="2px" ml="1px">
          :
        </TextContainer>
        <Text display="inline">{format(new Date(), "mm")}</Text>
      </Flex>
    </Flex>
  );
}
