import { RootState } from "@/store";
import { AppMenuState } from "@/store/desktop";
import { Image } from "@chakra-ui/image";
import { Divider, Flex, Text } from "@chakra-ui/layout";
import { useSelector } from "react-redux";

type Props = {
  onClick: () => void;
  forwardRef: React.Ref<HTMLDivElement>;
};

export function DesktopAppMenuButton({ onClick, forwardRef }: Props) {
  const appMenuState = useSelector<RootState, AppMenuState>(
    (state) => state.desktop.appMenu
  );

  return (
    <>
      <Flex
        alignItems="center"
        cursor="pointer"
        _hover={{ bgColor: "#7f677f" }}
        justifyContent="space-between"
        onClick={onClick}
        bgColor={appMenuState.isActive ? "primary.600" : "primary.500"}
        ref={forwardRef}
      >
        <Image src="/icons/app-other.png" w="2.18rem" h="1.55rem" pr={2} />
        <Text fontSize="15px" mr={2} userSelect="none">
          Applications
        </Text>
      </Flex>
      <Divider orientation="vertical" mr={1} />
    </>
  );
}
