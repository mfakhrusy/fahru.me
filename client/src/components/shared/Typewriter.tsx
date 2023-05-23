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
  onFinish,
  stepTimeSecond = 0.1,
  onFinishDelay = 100,
}: Props) {
  const textArr = text.split("");
  const duration = text.length * stepTimeSecond;
  const stepSize = 1 / text.length;

  useEffect(() => {
    if (onFinish) {
      setTimeout(() => onFinish(), duration * 1000 + onFinishDelay);
    }
  }, [duration, onFinish, onFinishDelay]);

  return useMemo(
    () => (
      <motion.p
        style={{
          opacity: 0,
        }}
        animate={{ opacity: [0, 1, 1] }}
        transition={{
          duration: stepTimeSecond,
          times: [0, 1, 1],
        }}
      >
        {textArr.map((letter, index) => {
          return (
            <motion.span
              key={index}
              style={{
                width: "8px",
                display: "inline-flex",
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 1],
              }}
              transition={{
                times: [index * stepSize, index * stepSize + stepSize, 1],
                duration,
                ease: "linear",
              }}
            >
              {letter}
            </motion.span>
          );
        })}
      </motion.p>
    ),
    [duration, stepSize, stepTimeSecond, textArr]
  );
}
