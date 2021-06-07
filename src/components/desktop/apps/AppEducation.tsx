import { AppLayout } from "@/components/desktop/apps/AppLayout";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";
import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { MutableRefObject } from "react";

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
            <Text fontWeight="600">Undergraduate University</Text>
            <Text>Bandung Institute of Technology</Text>
            <Text as="small">2012 - 2016</Text>
            <Text as="small">3.76 / 4.00 GPA</Text>
            <Text>Major: Aerospace Engineering</Text>
            <Text>
              Undergrad thesis topic: Direct Numerical Simulation for
              Computational Fluid Dynamic (forgot the exact title but it's good
              enough)
            </Text>
          </ListItem>
          <ListItem mb="15px">
            <Text fontWeight="600">Freecodecamp</Text>
            <small>2016 - 2018</small>
            <Text>
              My "formal" education for web development studies. I actually
              learnt from from whatever source I could find, but freecodecamp
              acted as my main study sources.
            </Text>
            <Text>
              I didn't get certifications from the platform since I got my first
              web development job while I was still learning there, and you
              know, I'm too "lazy" to get the certification since I was too
              focused on my newly acquired job and forgot to continue it.
            </Text>
          </ListItem>
        </UnorderedList>
      )}
    </AppLayout>
  );
}
