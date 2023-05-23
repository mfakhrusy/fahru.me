import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Typewriter } from "./Typewriter";

type Props = {
  texts: Array<string>;
  onFinish?: () => void;
};

export function MultilineTypewriter({ texts, onFinish }: Props) {
  const [currentLine, setCurrentLine] = useState<number>(0);

  return (
    <Flex flexDir="column">
      {texts.map((text, index) => {
        if (index <= currentLine) {
          if (index < texts.length - 1) {
            return (
              <Typewriter
                key={index}
                text={text}
                onFinish={() => setCurrentLine(currentLine + 1)}
                onFinishDelay={150}
                stepTimeSecond={0.07}
              />
            );
          } else {
            return (
              <Typewriter
                key={index}
                text={text}
                onFinish={onFinish}
                stepTimeSecond={0.07}
              />
            );
          }
        }
      })}
    </Flex>
  );
}
