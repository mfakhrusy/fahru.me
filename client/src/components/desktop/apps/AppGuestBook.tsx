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
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppLayout } from "@/components/desktop/apps/layout/AppLayout";
import type { AppDispatch, RootState } from "@/store";
import { setActiveDesktopApp } from "@/store/desktop";
import { fetchGuestbook } from "@/store/guestbook";

export const AppGuestBook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [submittedData, setSubmittedData] = useState<null | {
    name: string;
    website: string;
    message: string;
  }>(null);

  const onClose = () => dispatch(setActiveDesktopApp("DesktopMainView"));

  useEffect(() => {
    dispatch(fetchGuestbook());
    // Check localStorage for submitted data
    try {
      const stored = localStorage.getItem("guestbookForm");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name && parsed?.message) {
          setSubmittedData(parsed);
        }
      }
    } catch (e) {
      // Ignore localStorage errors
    }
  }, [dispatch]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      website: formData.get("website"),
      message: formData.get("message"),
    };
    try {
      localStorage.setItem(
        "guestbookForm",
        JSON.stringify({
          name: data.name,
          website: data.website,
          message: data.message,
        })
      );
      setSubmittedData({
        name: data.name as string,
        website: data.website as string,
        message: data.message as string,
      });
    } catch (e) {
      // Ignore localStorage errors
    }
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

  const { guestbookEntries, loading, error } = useSelector(
    (state: RootState) => state.guestbook
  );

  // check if guestbookEntries contains the submittedData
  useEffect(() => {
    if (submittedData) {
      const exists = guestbookEntries.some(
        (entry) =>
          entry.name === submittedData.name &&
          entry.message === submittedData.message &&
          entry.website === submittedData.website
      );

      // if exists, remove it from localStorage
      if (exists) {
        try {
          localStorage.removeItem("guestbookForm");
        } catch (e) {
          // Ignore localStorage errors
        }
      }

    }
  }, [guestbookEntries, submittedData]);

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
          <Flex bgColor="white" borderRadius={"5px"} minH="200px" align="center" justify="center">
            {submittedData ? (
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
                  Thank you! Your message has been submitted and is awaiting verification from the site owner.
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
                    <strong>Name:</strong> {submittedData.name}
                  </div>
                  {submittedData.website && (
                    <div>
                      <strong>Website:</strong>{" "}
                      <Link
                        href={
                          submittedData.website.includes("http")
                            ? submittedData.website
                            : `https://${submittedData.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        color="pink.500"
                        isExternal
                      >
                        {submittedData.website.replace(/^https?:\/\//, "")}
                      </Link>
                    </div>
                  )}
                  <div style={{ marginTop: 8 }}>
                    <strong>Message:</strong>
                    <div style={{ color: "#444", fontSize: "0.98em", wordBreak: "break-word" }}>
                      {submittedData.message}
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
                <Text fontSize="xs" color="gray.500" textAlign="center" mb={2} mx={2}>
                  Note: Your message will be verified by the site owner before it appears. Just to make sure it looks OK to be shown *smile*
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
