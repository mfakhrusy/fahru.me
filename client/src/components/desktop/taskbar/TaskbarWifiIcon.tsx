import {
  Flex,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { BiWifi, BiWifiOff } from "react-icons/bi";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export function TaskbarWifiIcon() {
  const serverReachable = useSelector<RootState, boolean>(
    (state) => state.connection.serverReachable
  );

  return (
    <Flex ml="auto" alignItems="center">
      <Popover placement="bottom">
        <PopoverTrigger>
          <IconButton
            aria-label="button"
            bgColor="transparent"
            minWidth="20px"
            _hover={{ bgColor: "transparent" }}
          >
            {serverReachable ? <BiWifi /> : <BiWifiOff />}
          </IconButton>
        </PopoverTrigger>
        <PopoverContent width="100%">
          <PopoverBody>
            <Text color="black" fontSize="12px">
              {serverReachable
                ? "Connected to the Internet"
                : "404 Internet Not Found"}
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}
