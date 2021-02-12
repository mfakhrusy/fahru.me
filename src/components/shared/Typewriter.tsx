import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

type Props = {
  text: string;
  onFinish?: () => void;
  stepTimeSecond?: number;
  onFinishDelay?: number; // in miliseconds
};

export function Typewriter({
  text,
  onFinish = () => undefined,
  stepTimeSecond = 0.1,
  onFinishDelay = 100,
}: Props) {
  const textArr = text.split("");
  const duration = text.length * stepTimeSecond;
  const stepSize = 1 / text.length;

  useEffect(() => {
    setTimeout(() => onFinish(), duration * 1000 + onFinishDelay);
  }, []);

  return useMemo(
    () => (
      <motion.p
        style={{
          opacity: 0,
        }}
        animate={{ opacity: [0, 1] }}
        transition={{
          duration: stepTimeSecond,
          times: [0, 1],
        }}
      >
        {textArr.map((letter, index) => {
          return (
            <motion.span
              key={index}
              style={{
                width: "8px",
                display: "inline-flex",
              }}
              animate={{
                opacity: ["0", "1"],
              }}
              transition={{
                times: [index * stepSize, index * stepSize + stepSize],
                duration,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {letter}
            </motion.span>
          );
        })}
      </motion.p>
    ),
    []
  );
}
