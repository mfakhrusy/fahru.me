import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppLayout } from "@/components/desktop/apps/layout/AppLayout";
import { Markdown } from "@/components/shared/Markdown";
import type { DesktopApp } from "@/lib/desktop/desktop";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";
import {
  setActiveDesktopApp as setActiveDesktopAppAction,
  SetActiveDesktopAppAction,
} from "@/store/desktop";

type AppMarkdownLayoutProps = {
  markdown: string;
  title: string;
};

export const AppMarkdownLayout = memo(function AppAboutMe({
  markdown,
  title,
}: AppMarkdownLayoutProps) {
  const dispatch = useDispatch();
  const shouldRenderContent = useDelayRenderOnTouchDevice({ delayAmount: 150 });

  const setActiveDesktopApp = useCallback<
    (args: DesktopApp) => SetActiveDesktopAppAction
  >((payload) => dispatch(setActiveDesktopAppAction(payload)), [dispatch]);

  const onClose = () => setActiveDesktopApp("DesktopMainView");

  return (
    <AppLayout title={title} onClose={onClose}>
      {shouldRenderContent && <Markdown>{markdown}</Markdown>}
    </AppLayout>
  );
});
