import { Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { DesktopMainView } from "@/components/desktop/DesktopMainView";
import { DesktopTouchView } from "@/components/desktop/DesktopTouchView";
import { DesktopTaskbar } from "@/components/desktop/taskbar/DesktopTaskbar";
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
