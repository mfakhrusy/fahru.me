import { MutableRefObject, memo } from "react";
import { AppLayout } from "@/components/desktop/apps/layout/AppLayout";
import { Markdown } from "@/components/shared/Markdown";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";

type AppMarkdownLayoutProps = {
  onClose: () => void;
  isOpen: boolean;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
  markdown: string;
  title: string;
};

export const AppMarkdownLayout = memo(function AppAboutMe({
  onClose,
  isOpen,
  dragConstraintRef,
  markdown,
  title,
}: AppMarkdownLayoutProps) {
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
