import { Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { DesktopMainView } from "@/components/desktop/DesktopMainView";
import { DesktopTouchView } from "@/components/desktop/DesktopTouchView";
import { Taskbar } from "@/components/desktop/taskbar/Taskbar";
import useIsTouchDevice from "@/lib/useIsTouchDevice";

function DesktopScreen() {
  const isTouchDevice = useIsTouchDevice();

  return (
    <Flex
      flexDir="column"
      h="100vh"
      w="100vw"
      overflowY="hidden"
      overflowX="hidden"
    >
      {isTouchDevice ? (
        <DesktopTouchView />
      ) : (
        <>
          <Taskbar />
          <DesktopMainView />
        </>
      )}
    </Flex>
  );
}

export default dynamic(() => Promise.resolve(DesktopScreen), {
  ssr: false,
});
