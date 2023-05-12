import { Button } from "@chakra-ui/button";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import { useRouter } from "next/router";
import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { disableAppMenu as disableAppMenuAction } from "@/store/desktop";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export function DesktopRebootModal({ isOpen, onClose }: Props) {
  const cancelRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch();

  const disableAppMenu = useCallback<() => void>(
    () => dispatch(disableAppMenuAction()),
    [dispatch]
  );

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Reboot
          </AlertDialogHeader>

          <AlertDialogBody>
            This system will be rebooted, are you sure?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                onClose();
                disableAppMenu();
                router.replace("/shutdown/process?reboot=true");
              }}
              ml={3}
            >
              Reboot
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
