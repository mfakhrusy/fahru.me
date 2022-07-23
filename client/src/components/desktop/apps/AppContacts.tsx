import { AppLayout } from "@/components/desktop/apps/AppLayout";
import { InlineLink } from "@/components/shared/InlineLink";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";
import { Box, Text } from "@chakra-ui/react";
import { MutableRefObject } from "react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export function AppContacts({ onClose, isOpen, dragConstraintRef }: Props) {
  const shouldRenderContent = useDelayRenderOnTouchDevice({ delayAmount: 150 });

  return (
    <AppLayout
      title="Contacts"
      onClose={onClose}
      isOpen={isOpen}
      dragConstraintRef={dragConstraintRef}
    >
      {shouldRenderContent && (
        <>
          <Text fontWeight="bold">Email</Text>
          <InlineLink href="mailto:fakhrusy.m@gmail.com">
            fakhrusy.m@gmail.com
          </InlineLink>
          <Box minH="16px" />
          <Text fontWeight="bold">Twitter</Text>
          <InlineLink href="https://twitter.com/f_fakhrusy">
            @f_fakhrusy
          </InlineLink>
          <Box minH="16px" />
          <Text fontWeight="bold">GitHub</Text>
          <InlineLink href="https://github.com/mfakhrusy/">
            mfakhrusy
          </InlineLink>
          <Box minH="16px" />
          <Text fontWeight="bold">Stack Overflow</Text>
          <InlineLink href="https://stackoverflow.com/users/5835100/mfakhrusy">
            mfakhrusy
          </InlineLink>
          <Box minH="16px" />
          <Text fontWeight="bold">LinkedIn</Text>
          <InlineLink
            href="https://www.linkedin.com/in/mfakhrusy/"
            outline="none"
          >
            Muhamad Fakhrusy
          </InlineLink>
        </>
      )}
    </AppLayout>
  );
}
