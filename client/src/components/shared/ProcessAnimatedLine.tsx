import { Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import useIsTouchDevice from "@/lib/useIsTouchDevice";

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
  const isTouchDevice = useIsTouchDevice();

  return (
    <motion.p
      style={{
        color: "white",
        whiteSpace: "nowrap",
        opacity: "0%",
        fontFamily: "DOS VGA",
        fontSize: isTouchDevice ? "12px" : "18px",
      }}
      animate={{
        opacity: [0, 1, 1],
      }}
      transition={{
        times: [startTime, endTime, 1],
        ease: "linear",
        duration,
      }}
    >
      {status !== "Loading" && (
        <Text as="span" mr={isTouchDevice ? 0 : 4}>
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
        <Text as="span" ml={isTouchDevice ? 0 : 4} mr={2}>
          ]
        </Text>
      )}
      <Text
        as="span"
        ml={status === "Loading" ? (isTouchDevice ? "22px" : "60px") : 0}
      >
        {text}
      </Text>
    </motion.p>
  );
}
