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
import { Ref, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DesktopAppMenuButton } from "./DesktopAppMenuButton";
import { DesktopAppSimpleClock } from "./DesktopAppSimpleClock";

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
  const [now, setTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
      <DesktopAppMenuButton onClick={onClickApplications} />
      <DesktopAppSimpleClock />
    </Flex>
  );
}
