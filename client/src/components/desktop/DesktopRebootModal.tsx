import { useRouter } from "next/router";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { SystemModal } from "@/components/shared/SystemModal";
import { disableAppMenu as disableAppMenuAction } from "@/store/desktop";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export function DesktopRebootModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const disableAppMenu = useCallback<() => void>(
    () => dispatch(disableAppMenuAction()),
    [dispatch]
  );

  return (
    <SystemModal
      isOpen={isOpen}
      onClose={onClose}
      header="Reboot"
      body="Are you sure you want to reboot the system?"
      confirmButtonLabel="Reboot"
      onClickConfirm={() => {
        disableAppMenu();
        onClose();
        router.replace("/shutdown/process?reboot=true");
      }}
    />
  );
}
