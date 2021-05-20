import { AppLayout } from "@/components/desktop/apps/AppLayout";
import useIsTouchDevice from "@/lib/useIsTouchDevice";
import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { MutableRefObject, useEffect, useState } from "react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export function AppWorkHistory({ onClose, isOpen, dragConstraintRef }: Props) {
  const isTouchDevice = useIsTouchDevice();
  const [shouldRenderContent, setshouldRenderContent] = useState(false);

  useEffect(() => {
    if (isTouchDevice) {
      setTimeout(() => setshouldRenderContent(true), 150);
    } else {
      setshouldRenderContent(true);
    }
  }, []);

  let renderContent = () => (
    <>
      {shouldRenderContent && (
        <UnorderedList listStyleType="none" ml="0">
          <ListItem mb="15px">
            <Text fontWeight="600">Software Engineer (Frontend)</Text>
            <Text>Ruangguru, Indonesia</Text>
            <small>2019 - Present, Full-time</small>
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
            <Text fontWeight="600">Freelance Software Developer</Text>
            <Text>Self Employed</Text>
            <small>2019 - 2020</small>
            <UnorderedList mt="10px">
              <ListItem>
                Built a document management system for an indonesian airline
                using react, react-native, node, postgreSQL, and azure for web
                and android
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem mb="15px">
            <Text fontWeight="600">Frontend Engineer</Text>
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
            <Text fontWeight="600">
              Math, Physics, & Engineering course Tutor
            </Text>
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
