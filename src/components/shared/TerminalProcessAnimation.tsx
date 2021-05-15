import {
  ProcessAnimatedLine,
  Status,
} from "@/components/shared/ProcessAnimatedLine";

export type AnimatedText = {
  value: string;
  status: Status;
};

type Props = {
  text: Array<AnimatedText>;
  stepTimeInSecond?: number;
};

export function TerminalProcessAnimation({
  text,
  stepTimeInSecond = 0.25,
}: Props) {
  const duration = text.length * stepTimeInSecond;
  const stepSize = 1 / text.length;

  return (
    <>
      {text.map((val, i) => {
        return (
          <ProcessAnimatedLine
            key={i}
            text={val.value}
            startTime={i * stepSize}
            endTime={i * stepSize + stepSize}
            status={val.status}
            duration={duration}
          />
        );
      })}
    </>
  );
}
