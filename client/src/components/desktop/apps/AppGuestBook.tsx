import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  List,
  ListItem,
  Textarea,
} from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppLayout } from "@/components/desktop/apps/layout/AppLayout";
import type { AppDispatch, RootState } from "@/store";
import { setActiveDesktopApp } from "@/store/desktop";
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
          backgroundImage={"url(/pink-flower-pattern.svg)"}
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
                  Your website (this will be shown to everyone here; optional)
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
              <Button
                type="submit"
                variant={"solid"}
                bgColor="pink"
                m={3}
                disabled={loading}
              >
                Say hi!
              </Button>
            </form>
          </Flex>
        </Flex>
        <Flex
          w="50%"
          h="100%"
          flexDir="column"
          bg="white"
          p={4}
          borderRadius="10px"
          overflowY="auto"
        >
          <List spacing={3}>
            {guestbookEntries.length === 0 && !loading && (
              <ListItem color="gray.500" textAlign="center" py={8}>
                No messages yet. Be the first to say hi!
              </ListItem>
            )}
            {loading && (
              <ListItem color="gray.400" textAlign="center" py={8}>
                Loading messages...
              </ListItem>
            )}
            {guestbookEntries
            .filter((item) => !item.deleted && item.verified)
            .map((item) => (
              <ListItem
                key={item.id}
                p={4}
                mb={2}
                borderRadius="8px"
                bg="gray.50"
                boxShadow="sm"
                border="1px solid"
                borderColor="gray.100"
              >
                <Flex align="center" mb={1}>
                  <span style={{ fontWeight: 600 }}>{item.name}</span>
                  {item.website && (
                    <Link
                      href={item.website.includes("http") ? item.website : `https://${item.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      ml={2}
                      color="pink.500"
                      fontSize="sm"
                      isExternal
                    >
                      ({item.website.replace(/^https?:\/\//, "")})
                    </Link>
                  )}
                </Flex>
                <Flex>
                  <p
                    style={{
                      color: "#444",
                      fontSize: "0.98em",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.message}
                  </p>
                </Flex>
              </ListItem>
            ))}
          </List>
        </Flex>
      </Flex>
    </AppLayout>
  );
};
