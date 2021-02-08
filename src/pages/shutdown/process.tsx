import { BlackTerminalPage } from "@/components/shared/BlackTerminalPage";
import { ShutdownProcessView } from "@/components/shutdown/ShutdownProcessView";

export default function ShutdownProcessScreen() {
  return (
    <BlackTerminalPage>
      <ShutdownProcessView />
    </BlackTerminalPage>
  );
}
