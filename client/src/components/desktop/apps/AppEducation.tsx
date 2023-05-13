import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import type { MutableRefObject } from "react";
import { AppLayout } from "@/components/desktop/apps/AppLayout";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export function AppEducation({ onClose, isOpen, dragConstraintRef }: Props) {
  const shouldRenderContent = useDelayRenderOnTouchDevice({ delayAmount: 150 });

  return (
    <AppLayout
      title="Education"
      onClose={onClose}
      isOpen={isOpen}
      dragConstraintRef={dragConstraintRef}
    >
      {shouldRenderContent && (
        <UnorderedList listStyleType="none" ml="0">
          <ListItem mb="15px">
            <Text fontWeight="600">Undergraduate Degree</Text>
            <Text>Bandung Institute of Technology, Indonesia</Text>
            <Text as="small" display="flex">
              2012 - 2016
            </Text>
            <Text as="small">3.76 / 4.00 GPA</Text>
            <Text>Major: Aerospace Engineering</Text>
            <Box h={2} />
            <Text>
              Research Thesis: Direct Numerical Simulation for Computational
              Fluid Dynamic (forgot the exact title but it&apos;s close enough)
            </Text>
          </ListItem>
          <ListItem mb="15px">
            <Text fontWeight="600">Freecodecamp</Text>
            <small>2016 - 2018</small>
            <Text>
              My &quot;formal&quot; education for web development studies. I
              actually learnt from from whatever source I could find, but
              freecodecamp acted as my main study sources.
            </Text>
            <Box h={2} />
            <Text>
              I didn&apos;t get certifications from the platform since I got my
              first web development job while I was still learning there.
            </Text>
          </ListItem>
        </UnorderedList>
      )}
    </AppLayout>
  );
}
