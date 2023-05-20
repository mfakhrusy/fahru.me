import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { SystemModal } from "@/components/shared/SystemModal";
import { setTaskbarMenu } from "@/store/taskbar";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export function DesktopShutdownModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <SystemModal
      isOpen={isOpen}
      onClose={onClose}
      header="Shutdown"
      body="Are you sure you want to shutdown the system?"
      confirmButtonLabel="Shutdown"
      onClickConfirm={() => {
        dispatch(setTaskbarMenu());
        onClose();
        router.replace("/shutdown/process");
      }}
    />
  );
}
