import { AppLayout } from "@/components/desktop/apps/AppLayout";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";
import {
  Box,
  ListItem,
  Text,
  UnorderedList,
  Heading,
  OrderedList,
} from "@chakra-ui/react";
import { MutableRefObject } from "react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export function AppWorkHistory({ onClose, isOpen, dragConstraintRef }: Props) {
  const shouldRenderContent = useDelayRenderOnTouchDevice({ delayAmount: 150 });

  const renderContent = () => (
    <>
      {shouldRenderContent && (
        <UnorderedList listStyleType="none" ml="0">
          <ListItem mb="15px">
            <Heading as="h1" size="lg" fontWeight="600">
              Software Engineer
            </Heading>
            <Text>Overleaf</Text>
            <small>Feb 2022 - Current, Full-time</small>
            <Box h={4} />
            <Text>What will I write here, I wonder?</Text>
          </ListItem>
          <ListItem mb="15px">
            <Heading as="h1" size="lg" fontWeight="600">
              Software Engineer (Frontend)
            </Heading>
            <Text>Ruangguru, Indonesia</Text>
            <small>2019 - Aug 2021, Full-time</small>
            <Box h={4} />
            <Text>
              {" "}
              Assigned to Skillacademy team. I worked on all web platforms,
              including:
            </Text>
            <UnorderedList mt="10px">
              <ListItem>
                Built and maintained skillacademy frontend codebase in ReasonML
                & ReasonReact for web and mobile platform in cordova
              </ListItem>
              <ListItem>
                Initiated the migration from javascript to typescript for
                skillacademy content management system (CMS)
              </ListItem>
              <ListItem>
                Helped enhancing frontend tools on typescript language after we
                decided to migrate from reasonML due to reasonML instability on
                enterprise products
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem mb="15px">
            <Heading as="h1" size="lg" fontWeight="600">
              Founder
            </Heading>
            <Text>Sirius Teknologi Indonesia</Text>
            <small>2019 - 2020</small>
            <Text mt="10px">
              A software agency focused on web and mobile application.
            </Text>
            <Text mt="10px">Project:</Text>
            <OrderedList mt="10px">
              <ListItem>
                Built a document management system for an indonesian airline
                <UnorderedList mt="10px">
                  <ListItem>
                    Backend web application. Tech stacks: Typescript, NodeJS,
                    Azure
                  </ListItem>
                  <ListItem>
                    Frontend web application. Tech stacks: Typescript, React,
                    Redux
                  </ListItem>
                  <ListItem>
                    Mobile application. Tech stacks: Typescript, React Native,
                    Redux
                  </ListItem>
                  <ListItem>
                    DevOps: Azure Web App for both frontend and backend, and
                    Azure DevOps for CI/CD platform.
                  </ListItem>
                </UnorderedList>
              </ListItem>
            </OrderedList>
          </ListItem>
          <ListItem mb="15px">
            <Heading as="h1" size="lg" fontWeight="600">
              Frontend Engineer
            </Heading>
            <Text>Codemi, Indonesia</Text>
            <small>2018 - 2019, Full-time</small>
            <UnorderedList mt="10px">
              <ListItem>
                Developed and maintained learning management system frontend in
                javascript & reactJS, both client side and admin dashboard
              </ListItem>
              <ListItem>
                Developed an online course platform frontend using javascript &
                reactJS
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem mb="15px">
            <Heading as="h1" size="lg" fontWeight="600">
              Math, Physics, & Engineering course Tutor
            </Heading>
            <Text>Smart Privat, Indonesia</Text>
            <small>2014 - 2017, Part-time</small>
            <UnorderedList mt="10px">
              <ListItem>
                Taught mathematics & physics to a first year students at Bandung
                Institute of Technology
              </ListItem>
              <ListItem>
                Taught programming (C++) & engineering course to a second year
                student at Bandung Institute of Technology
              </ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>
      )}
    </>
  );

  return (
    <AppLayout
      dragConstraintRef={dragConstraintRef}
      isOpen={isOpen}
      onClose={onClose}
      title="Work History"
    >
      {renderContent()}
    </AppLayout>
  );
}
