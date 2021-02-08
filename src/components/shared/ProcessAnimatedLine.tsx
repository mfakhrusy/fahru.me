import { Text, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";

export type Status = "Ok" | "Error" | "Loading";

const makeStatusText = (status: Status) => {
  switch (status) {
    case "Ok":
      return "OK";
    case "Error":
      return "ERROR";
    case "Loading":
      return "";
    default:
      return "";
  }
};

type Props = {
  text: string;
  startTime?: number;
  endTime?: number;
  status: Status;
  duration?: number;
};

export function ProcessAnimatedLine({
  text,
  startTime = 0,
  endTime = 0.2,
  status,
  duration = 1,
}: Props) {
  const [isSmallerThan500] = useMediaQuery("(max-width: 500px)")

  return (
    <motion.p
      style={{
        color: "white",
        whiteSpace: "nowrap",
        opacity: "0%",
        fontFamily: "DOS VGA",
        fontSize: isSmallerThan500 ? '10px' : '18px',
      }}
      animate={{
        opacity: ["0%", "100%"],
      }}
      transition={{
        times: [startTime, endTime],
        ease: [0.7, 0, 0.84, 0],
        duration,
      }}
    >
      {status !== "Loading" && (
        <Text as="span" mr={isSmallerThan500 ? 0 : 4}>
          [
        </Text>
      )}
      <Text
        as="span"
        color={status === "Ok" ? "green" : "red"}
        width="50px"
        display="inline-block"
        textAlign="center"
      >
        {makeStatusText(status)}
      </Text>
      {status !== "Loading" && (
        <Text as="span" ml={isSmallerThan500 ? 0 : 4} mr={2}>
          ]
        </Text>
      )}
      <Text as="span" ml={status === "Loading" ? (isSmallerThan500 ? '19px' : '60px') : 0}>
        {text}
      </Text>
    </motion.p>
  );
}
