import { useRouter } from "next/router";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { SystemModal } from "@/components/shared/SystemModal";
import { disableAppMenu as disableAppMenuAction } from "@/store/desktop";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export function DesktopShutdownModal({ isOpen, onClose }: Props) {
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
      header="Shutdown"
      body="Are you sure you want to shutdown the system?"
      confirmButtonLabel="Shutdown"
      onClickConfirm={() => {
        disableAppMenu();
        onClose();
        router.replace("/shutdown/process");
      }}
    />
  );
}
