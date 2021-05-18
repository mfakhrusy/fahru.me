import { BlackTerminalPage } from "@/components/shared/BlackTerminalPage";
import { ShutdownProcessView } from "@/components/shutdown/ShutdownProcessView";
import usePageViewTracking from "@/lib/usePageViewTracking";

export default function ShutdownProcessScreen() {
  usePageViewTracking();

  return (
    <BlackTerminalPage>
      <ShutdownProcessView />
    </BlackTerminalPage>
  );
}
