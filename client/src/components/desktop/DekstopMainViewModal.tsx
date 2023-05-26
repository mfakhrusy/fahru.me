import { useDispatch, useSelector } from "react-redux";
import { DesktopRebootModal } from "@/components/desktop/DesktopRebootModal";
import { DesktopShutdownModal } from "@/components/desktop/DesktopShutdownModal";
import type { RootState } from "@/store";
import { type ModalState, setModal } from "@/store/desktop";

export function DesktopMainViewModal() {
  const dispatch = useDispatch();
  const modal = useSelector<RootState, ModalState>(
    (state) => state.desktop.modal
  );

  switch (modal) {
    case "rebootModal":
      return (
        <DesktopRebootModal
          onClose={() => dispatch(setModal("noModal"))}
          isOpen={modal === "rebootModal"}
        />
      );
    case "shutdownModal":
      return (
        <DesktopShutdownModal
          onClose={() => dispatch(setModal("noModal"))}
          isOpen={modal === "shutdownModal"}
        />
      );
  }
}
