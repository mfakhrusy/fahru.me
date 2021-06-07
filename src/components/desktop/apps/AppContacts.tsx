import { AppLayout } from "@/components/desktop/apps/AppLayout";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Link, Text } from "@chakra-ui/react";
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
          <Link href="mailto:fakhrusy.m@gmail.com" target="_blank">
            fakhrusy.m@gmail.com <ExternalLinkIcon />
          </Link>
          <Box minH="16px" />
          <Text fontWeight="bold">Twitter</Text>
          <Link href="https://twitter.com/f_fakhrusy" target="_blank">
            @f_fakhrusy <ExternalLinkIcon />
          </Link>
          <Box minH="16px" />
          <Text fontWeight="bold">GitHub</Text>
          <Link href="https://github.com/mfakhrusy/" target="_blank">
            mfakhrusy <ExternalLinkIcon />
          </Link>
          <Box minH="16px" />
          <Text fontWeight="bold">Stack Overflow</Text>
          <Link
            href="https://stackoverflow.com/users/5835100/mfakhrusy"
            target="_blank"
          >
            mfakhrusy <ExternalLinkIcon />
          </Link>
          <Box minH="16px" />
          <Text fontWeight="bold">LinkedIn</Text>
          <Link
            href="https://www.linkedin.com/in/mfakhrusy/"
            target="_blank"
            outline="none"
          >
            Muhamad Fakhrusy <ExternalLinkIcon />
          </Link>
        </>
      )}
    </AppLayout>
  );
}
