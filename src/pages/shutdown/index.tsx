import { ShutdownView } from "@/components/shutdown/ShutdownView";
import usePageViewTracking from "@/lib/usePageViewTracking";

export default function ShutdownScreen() {
  usePageViewTracking();

  return <ShutdownView />;
}
