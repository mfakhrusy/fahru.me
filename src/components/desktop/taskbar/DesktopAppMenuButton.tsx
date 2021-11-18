import { RootState } from "@/store";
import { AppMenuState } from "@/store/desktop";
import { Image } from "@chakra-ui/image";
import { Divider, Flex, Text } from "@chakra-ui/layout";
import { useSelector } from "react-redux";

type Props = {
  onClick: () => void;
};

export function DesktopAppMenuButton({ onClick }: Props) {
  const appMenuState = useSelector<RootState, AppMenuState>(
    (state) => state.desktop.appMenu
  );

  return (
    <>
      <Flex
        alignItems="center"
        cursor="pointer"
        p={1}
        _hover={{ bgColor: "#7f677f" }}
        borderRadius="5px"
        justifyContent="space-between"
        onClick={onClick}
        bgColor={appMenuState.isActive ? "primary.600" : "primary.500"}
      >
        <Image src="/icons/app-other.png" w={10} h={8} pr={2} />
        <Text mr={2} userSelect="none">
          Applications
        </Text>
      </Flex>
      <Divider orientation="vertical" ml={1} mr={1} />
    </>
  );
}
