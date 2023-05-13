import { Image } from "@chakra-ui/image";
import { Divider, Flex, Text } from "@chakra-ui/layout";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { AppMenuState } from "@/store/desktop";

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
        _hover={{ bgColor: "debian.600" }}
        justifyContent="space-between"
        onClick={onClick}
        bgColor={appMenuState.isActive ? "debian.600" : "debian.500"}
        ref={forwardRef}
      >
        <Image
          src="/icons/app-other.png"
          w="2.18rem"
          h="1.55rem"
          pr={2}
          alt="Application List"
        />
        <Text fontSize="15px" mr={2} userSelect="none">
          Applications
        </Text>
      </Flex>
      <Divider orientation="vertical" mr={1} />
    </>
  );
}
