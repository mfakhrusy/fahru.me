import { ProcessAnimatedLine, Status } from "../shared/ProcessAnimatedLine";

type Text = {
  value: string;
  status: Status;
};

const makeText: () => Array<Text> = () => [
  { value: "Started something important", status: "Ok" },
  { value: "Loading . . .", status: "Loading" },
  { value: "Some weird error occurred", status: "Error" },
  { value: "Weird error resolved", status: "Ok" },
  { value: "Starting another thing", status: "Loading" },
  {
    value: "Starting another else in parallel with another thing",
    status: "Loading",
  },
  {
    value: "This is just a nonsensical text, don't worry about me",
    status: "Ok",
  },
  { value: "Can I just throw error here", status: "Error" },
  { value: "Started the site, I guess", status: "Ok" },
  { value: "bip bop I'm a robot", status: "Ok" },
  { value: "I want some food", status: "Error" },
  { value: "The definition of insanity is", status: "Loading" },
  { value: ". . .", status: "Loading" },
  { value: ". . .", status: "Loading" },
  { value: ". . .", status: "Loading" },
  { value: ". . .", status: "Loading" },
  {
    value: "Keep repeating the same thing, and expect a different outcome",
    status: "Error",
  },
  { value: "Uh, oh, will this stop", status: "Ok" },
  { value: "This cannot continue", status: "Error" },
  { value: "This cannot continue", status: "Error" },
  { value: "This cannot continue", status: "Loading" },
  { value: "This cannot continue", status: "Ok" },
  { value: "", status: "Loading" },
  {
    value: "Please press ENTER to continue (or RETURN, I think)",
    status: "Ok",
  },
];

export function BootUpView() {
  const stepTimeSecond = 0.25;
  const text = makeText();
  const duration = text.length * stepTimeSecond;
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
