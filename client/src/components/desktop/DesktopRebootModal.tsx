import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { SystemModal } from "@/components/shared/SystemModal";
import { setTaskbarMenu } from "@/store/taskbar";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export function DesktopRebootModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <SystemModal
      isOpen={isOpen}
      onClose={onClose}
      header="Reboot"
      body="Are you sure you want to reboot the system?"
      confirmButtonLabel="Reboot"
      onClickConfirm={() => {
        dispatch(setTaskbarMenu());
        onClose();
        router.replace("/shutdown/process?reboot=true");
      }}
    />
  );
}
