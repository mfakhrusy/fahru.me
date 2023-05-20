import {
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { BiWifi, BiWifiOff } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { type TaskbarState, setTaskbarMenu } from "@/store/taskbar";

export function TaskbarWifiIcon() {
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const serverReachable = useSelector<RootState, boolean>(
    (state) => state.connection.serverReachable
  );

  const taskbarMenu = useSelector<RootState, TaskbarState["taskbarMenu"]>(
    (state) => state.taskbar.taskbarMenu
  );

  useEffect(() => {
    // avoid double event firing, we need to introduce local state (isOpen)
    // and then manually set taskbarMenu to "WifiIcon" when isOpen is true
    // caveat: if closing the popover, taskbarMenu will still have "WifiIcon" as its value
    if (isOpen === true && taskbarMenu !== "WifiIcon") {
      dispatch(setTaskbarMenu("WifiIcon"));
    }
  }, [dispatch, isOpen, taskbarMenu]);

  return (
    <Flex ml="auto" alignItems="center">
      <Popover
        placement="bottom"
        isOpen={isOpen}
        onClose={onClose}
        returnFocusOnClose={false}
      >
        <PopoverTrigger>
          <IconButton
            aria-label="button"
            bgColor="transparent"
            minWidth="20px"
            _hover={{ bgColor: "transparent" }}
            onClick={onOpen}
          >
            {serverReachable ? <BiWifi /> : <BiWifiOff />}
          </IconButton>
        </PopoverTrigger>
        <PopoverContent width="100%">
          <PopoverArrow />
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
