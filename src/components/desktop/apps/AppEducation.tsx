import { Box, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AppLayout } from "./AppLayout";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export function AppEducation({ onClose, isOpen }: Props) {
  const [shouldRenderContent, setshouldRenderContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setshouldRenderContent(true), 150);
  }, []);

  return (
    <AppLayout
      title="Education"
      onClose={onClose}
      isOpen={isOpen}
      bgColor="white"
    >
      <Flex w="100%" h="auto" minH="calc(100vh - 30px)" flexDir="column">
        {shouldRenderContent && (
          <UnorderedList listStyleType="none" ml="0">
            <ListItem mb="15px">
              <Text fontWeight="600">Undergraduate University</Text>
              <Text>Bandung Institute of Technology</Text>
              <Text as="small" display="block">
                2012 - 2016
              </Text>
              <Text as="small" display="block">
                3.76 / 4.00 GPA
              </Text>
              <Text>Major: Aerospace Engineering</Text>
              <Text>
                Undergrad thesis topic: Direct Numerical Simulation for
                Computational Fluid Dynamic (forgot the exact title but it's
                good enough)
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
                I didn't get certifications from the platform since I got my
                first web development job while I was still learning there, and
                you know, I'm too "lazy" to get the certification since I was
                too focused on my newly acquired job and forgot to continue it.
              </Text>
            </ListItem>
          </UnorderedList>
        )}
      </Flex>
    </AppLayout>
  );
}
