import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  List,
  ListItem,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppLayout } from "@/components/desktop/apps/layout/AppLayout";
import type { AppDispatch, RootState } from "@/store";
import { setActiveDesktopApp } from "@/store/desktop";
import {
  fetchGuestbook,
  getPendingGuestbookEntrySubmission,
  removePendingGuestbookEntrySubmission,
  setPendingGuestbookEntrySubmission,
} from "@/store/guestbook";

export const AppGuestBook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const onClose = () => dispatch(setActiveDesktopApp("DesktopMainView"));
  const pendingGuestbookEntrySubmission = useSelector(
    (state: RootState) => state.guestbook.pendingGuestbookEntrySubmission
  );

  useEffect(() => {
    dispatch(fetchGuestbook());
    dispatch(getPendingGuestbookEntrySubmission());
  }, [dispatch]);

  const handleSubmit = useCallback(
    (event) => {
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
        .then(() => {
          dispatch(
            setPendingGuestbookEntrySubmission({
              name: data.name as string,
              website: data.website as string,
              message: data.message as string,
            })
          );
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    [dispatch]
  );

  const { guestbookEntries, loading } = useSelector(
    (state: RootState) => state.guestbook
  );

  // check if guestbookEntries contains the pendingGuestbookEntrySubmission
  useEffect(() => {
    if (pendingGuestbookEntrySubmission) {
      const existAndVerified = guestbookEntries.some(
        (entry) =>
          entry.name === pendingGuestbookEntrySubmission.name &&
          entry.message === pendingGuestbookEntrySubmission.message &&
          entry.website === pendingGuestbookEntrySubmission.website &&
          entry.verified
      );

      const existAndNotVerified = guestbookEntries.some(
        (entry) =>
          entry.name === pendingGuestbookEntrySubmission.name &&
          entry.message === pendingGuestbookEntrySubmission.message &&
          entry.website === pendingGuestbookEntrySubmission.website &&
          !entry.verified
      );

      const notExist = !existAndVerified && !existAndNotVerified;

      // if exists, remove it from localStorage
      if (existAndVerified) {
        dispatch(removePendingGuestbookEntrySubmission());
      } else if (existAndNotVerified) {
        // if exists but not verified, do nothing
        // this means the entry is still pending verification
      } else if (notExist) {
        // if not exist, retry posting the data
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/guestbook`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pendingGuestbookEntrySubmission),
        })
          .then((response) => response.json())
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  }, [dispatch, guestbookEntries, pendingGuestbookEntrySubmission]);

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
          <Flex
            bgColor="white"
            borderRadius={"5px"}
            minH="200px"
            align="center"
            justify="center"
          >
            {pendingGuestbookEntrySubmission ? (
              <Flex direction="column" align="center" w="100%" p={4}>
                <Flex
                  bg="pink.50"
                  border="1px solid"
                  borderColor="pink.200"
                  borderRadius="md"
                  p={3}
                  mb={3}
                  w="100%"
                  justify="center"
                  align="center"
                  color="pink.700"
                  fontWeight="bold"
                  fontSize="md"
                  textAlign="center"
                >
                  Thank you! Your message has been submitted and is awaiting
                  verification from the site owner.
                </Flex>
                <Flex
                  direction="column"
                  bg="gray.50"
                  borderRadius="md"
                  p={4}
                  w="100%"
                  border="1px solid"
                  borderColor="gray.100"
                  boxShadow="sm"
                >
                  <div>
                    <strong>Name:</strong>{" "}
                    {pendingGuestbookEntrySubmission.name}
                  </div>
                  {pendingGuestbookEntrySubmission.website && (
                    <div>
                      <strong>Website:</strong>{" "}
                      <Link
                        href={
                          pendingGuestbookEntrySubmission.website.includes(
                            "http"
                          )
                            ? pendingGuestbookEntrySubmission.website
                            : `https://${pendingGuestbookEntrySubmission.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        color="pink.500"
                        isExternal
                      >
                        {pendingGuestbookEntrySubmission.website.replace(
                          /^https?:\/\//,
                          ""
                        )}
                      </Link>
                    </div>
                  )}
                  <div style={{ marginTop: 8 }}>
                    <strong>Message:</strong>
                    <div
                      style={{
                        color: "#444",
                        fontSize: "0.98em",
                        wordBreak: "break-word",
                      }}
                    >
                      {pendingGuestbookEntrySubmission.message}
                    </div>
                  </div>
                </Flex>
              </Flex>
            ) : (
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
                    autoComplete="off"
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
                    autoComplete="off"
                  />
                </FormControl>
                <FormControl flexDir={"column"} display={"flex"} px={2}>
                  <FormLabel mb={0} mt={2} fontSize={"xs"} htmlFor="message">
                    Say something! (required, this will be shown to everyone
                    here)
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
                <Text
                  fontSize="xs"
                  color="gray.500"
                  textAlign="center"
                  mb={2}
                  mx={2}
                >
                  Note: Your message will be verified by the site owner before
                  it appears. Just to make sure it looks OK to be shown *smile*
                </Text>
              </form>
            )}
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
                        href={
                          item.website.includes("http")
                            ? item.website
                            : `https://${item.website}`
                        }
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
