import { Flex } from "@chakra-ui/react";
import { BiWifi, BiWifiOff } from "react-icons/bi";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export function TaskbarWifiIcon() {
  const serverReachable = useSelector<RootState, boolean>(
    (state) => state.connection.serverReachable
  );

  return (
    <Flex ml="auto" alignItems="center">
      {serverReachable ? <BiWifi /> : <BiWifiOff />}
    </Flex>
  );
}
