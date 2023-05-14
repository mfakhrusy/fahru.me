import {
  Box,
  ListItem,
  Text,
  UnorderedList,
  Heading,
  OrderedList,
} from "@chakra-ui/react";
import type { MutableRefObject } from "react";
import { AppLayout } from "@/components/desktop/apps/layout/AppLayout";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";

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
            <Text> Assigned to skillacademy.com team. I worked on:</Text>
            <Box h={4} />
            <OrderedList>
              <ListItem>
                Skillacademy client-facing web platform. Tech stacks: ReasonML,
                React + ReasonReact
                <UnorderedList mt="10px">
                  <ListItem>
                    Helped Build a B2C MOOC platform that includes (but is not
                    limited to): Custom Video Player with DRM, Exam/Quiz
                    Platform, Custom File Upload (for homework).
                  </ListItem>
                  <ListItem>
                    Implement a cashless payment method (OVO Indonesia) on the
                    frontend with a websocket. I&rsquo;m the first one to
                    introduce websocket to the whole frontend team.
                  </ListItem>
                  <ListItem>
                    Main developer for a massive government project named
                    Pra-Kerja that, at some point, is the major contributor to
                    our company revenue.
                  </ListItem>
                  <ListItem>
                    Maintain the codebase by performing readable & maintainable
                    code principles.
                  </ListItem>
                  <ListItem>
                    Develop platitude marketing campaigns on the site, including
                    but not limited to: numerous flash sales, referral programs,
                    and other ad-hoc advertisement campaigns.
                  </ListItem>
                  <ListItem>
                    Mentoring a few newcomers to become productive on our
                    codebase since I have the most domain (at my engineering
                    level) knowledge of the whole application.
                  </ListItem>
                </UnorderedList>
              </ListItem>
              <ListItem>
                Skillacademy Content Management System (CMS). Tech stack:
                Typescript and React
                <UnorderedList mt="10px">
                  <ListItem>
                    Initiate the rewrite of our CMS from javascript to
                    typescript. This is one of the first typescript apps for the
                    whole frontend team. We previously use Javascript + Flow or
                    ReasonML for the frontend codebase.
                  </ListItem>
                  <ListItem>
                    Develop dynamic UI screen project for skillacademy where
                    admin can change some parts of the UI of skillacademy.com
                    with drag and drop method. This is useful for marketing
                    campaigns too. (UNRELEASE -- SAD)
                  </ListItem>
                </UnorderedList>
              </ListItem>
              <ListItem>
                Skillacademy Cordova Platform for mobile application. Tech
                stack: Cordova.
                <UnorderedList>
                  <ListItem>
                    I&rsquo;m one of the maintainers of the Cordova application
                    that used to be our main stack for the mobile application
                    before the app was rewritten to react-native.
                  </ListItem>
                </UnorderedList>
              </ListItem>
            </OrderedList>
          </ListItem>
          <ListItem mb="15px">
            <Heading as="h1" size="lg" fontWeight="600">
              Technical Founder
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
