import { useDispatch } from "react-redux";
import { AppLayout } from "@/components/desktop/apps/layout/AppLayout";
import { setActiveDesktopApp } from "@/store/desktop";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  Textarea,
} from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchGuestbook } from "@/store/guestbook";

export const AppGuestBook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const onClose = () => dispatch(setActiveDesktopApp("DesktopMainView"));

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      website: formData.get("website"),
      message: formData.get("message"),
    };
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/guestbook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Optionally, you can update the guestlist state here to reflect the new entry
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    dispatch(fetchGuestbook());
  }, [dispatch]);

  const { guestbookEntries, loading, error } = useSelector(
    (state: RootState) => state.guestbook
  );

  console.log("Guestbook Entries:", guestbookEntries);

  return (
    <AppLayout onClose={onClose} title="Guest Book" noPadding>
      <Flex
        w={"100%"}
        h="100%"
        minH={"500px"}
        flexDir="row"
        border={"1px solid rgba(255, 0, 0, 1)"}
        borderRadius="10px"
        overflow="hidden"
      >
        <Flex
          w={"50%"}
          h={"100%"}
          flexDir="column"
          backgroundImage={`url(/pink-flower-pattern.svg)`}
          p={3}
        >
          <Flex bgColor={"white"} p={3} mb={3} borderRadius="10px">
            Welcome! Please leave a message!
          </Flex>
          <Flex bgColor="white" borderRadius={"5px"}>
            <form
              style={{ width: "100%", borderRadius: "5px" }}
              onSubmit={handleSubmit}
            >
              <FormControl flexDir={"column"} display={"flex"} px={2}>
                <FormLabel mb={0} mt={2} fontSize={"xs"} htmlFor="name">
                  From who? (required, can be pseudonym)
                </FormLabel>
                <Input
                  p={2}
                  my={2}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                />
              </FormControl>
              <FormControl flexDir={"column"} display={"flex"} px={2}>
                <FormLabel mb={0} mt={2} fontSize={"xs"} htmlFor="website">
                  Your website (this will be shown to everyone here, it's
                  optional)
                </FormLabel>
                <Input
                  p={2}
                  my={2}
                  type="text"
                  id="website"
                  name="website"
                  placeholder="https://fahru.me (example)"
                />
              </FormControl>
              <FormControl flexDir={"column"} display={"flex"} px={2}>
                <FormLabel mb={0} mt={2} fontSize={"xs"} htmlFor="message">
                  Say something! (required, this will be shown to everyone here)
                </FormLabel>
                <Textarea
                  p={2}
                  my={2}
                  id="message"
                  name="message"
                  placeholder="Greeting message"
                  required
                />
              </FormControl>
              <Button type="submit" variant={"solid"} bgColor="pink" m={3} disabled={loading}>
                Say hi!
              </Button>
            </form>
          </Flex>
        </Flex>
        <Flex w={"50%"} h={"100%"}>
          {/* <List>
            {guestlist.map((item) => {
              return (
                <ListItem>
                  {item.name}
                </ListItem>
              )
            })}
          </List> */}
        </Flex>
      </Flex>
    </AppLayout>
  );
};
