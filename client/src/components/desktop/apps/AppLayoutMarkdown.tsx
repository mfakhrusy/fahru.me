import { MutableRefObject, memo } from "react";
import { AppLayout } from "@/components/desktop/apps/AppLayout";
import { Markdown } from "@/components/shared/Markdown";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";

type AppLayoutMarkdownProps = {
  onClose: () => void;
  isOpen: boolean;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
  markdown: string;
  title: string;
};

export const AppLayoutMarkdown = memo(function AppAboutMe({
  onClose,
  isOpen,
  dragConstraintRef,
  markdown,
  title,
}: AppLayoutMarkdownProps) {
  const shouldRenderContent = useDelayRenderOnTouchDevice({ delayAmount: 150 });

  return (
    <AppLayout
      title={title}
      onClose={onClose}
      isOpen={isOpen}
      dragConstraintRef={dragConstraintRef}
    >
      {shouldRenderContent && <Markdown>{markdown}</Markdown>}
    </AppLayout>
  );
});
