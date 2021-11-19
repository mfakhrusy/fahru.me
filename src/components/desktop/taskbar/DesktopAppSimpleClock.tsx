import { RootState } from "@/store";
import { setTimeWidgetActive, SetTimeWidgetActive } from "@/store/desktop";
import { Divider, Flex, Text } from "@chakra-ui/layout";
import styled from "@emotion/styled";
import { format, parseISO } from "date-fns";
import { useCallback } from "react";
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
  forwardRef: React.RefObject<HTMLDivElement>;
};

export function DesktopAppSimpleClock({ forwardRef }: Props) {
  const dispatch = useDispatch();

  const currentTime = useSelector<RootState, string>(
    (state) => state.desktop.currentTime
  );

  const isTimeWidgetActive = useSelector<RootState, boolean>(
    (state) => state.desktop.isTimeWidgetActive
  );

  const setTimeWidget = useCallback<(args: boolean) => SetTimeWidgetActive>(
    (payload) => dispatch(setTimeWidgetActive(payload)),
    []
  );

  return (
    <Flex
      ml="auto"
      alignItems="center"
      pr={4}
      cursor="pointer"
      userSelect="none"
      onClick={() => setTimeWidget(!isTimeWidgetActive)}
      ref={forwardRef}
    >
      <Divider orientation="vertical" mr={4} />
      <Text display="inline">{format(parseISO(currentTime), "HH")}</Text>
      <TextContainer display="inline" mb="4px" mr="1px" ml="1px">
        :
      </TextContainer>
      <Text display="inline">{format(parseISO(currentTime), "mm")}</Text>
    </Flex>
  );
}
