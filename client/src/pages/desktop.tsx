import dynamic from "next/dynamic";
import { Flex } from "@chakra-ui/react";
import { DesktopMainView } from "@/components/desktop/DesktopMainView";
import { DesktopTaskbar } from "@/components/desktop/taskbar/DesktopTaskbar";
import { DesktopTouchView } from "@/components/desktop/DesktopTouchView";
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
          <DesktopTaskbar />
          <DesktopMainView />
        </>
      )}
    </Flex>
  );
}

export default dynamic(() => Promise.resolve(DesktopScreen), {
  ssr: false,
});
