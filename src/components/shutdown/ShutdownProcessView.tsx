import { useRouter } from "next/router";
import { useEffect } from "react";
import { ProcessAnimatedLine, Status } from "../shared/ProcessAnimatedLine";

type Text = {
  value: string;
  status: Status;
};

const makeText: () => Array<Text> = () => [
  { value: "Shutdown process is started", status: "Ok" },
  {
    value: "Shutdown process is halting due to unforeseen circumstances",
    status: "Loading",
  },
  { value: ". . .", status: "Loading" },
  { value: ". . .", status: "Error" },
  { value: "Retrying shutdown process", status: "Loading" },
  { value: ". . .", status: "Loading" },
  { value: "Site is down", status: "Ok" },
  { value: "3", status: "Loading" },
  { value: "2", status: "Loading" },
  { value: "1", status: "Loading" },
  { value: "Thank you for visiting, see you later!", status: "Ok" },
];

export function ShutdownProcessView() {
  const stepTimeSecond = 0.25;
  const text = makeText();
  const duration = text.length * stepTimeSecond;
  const stepSize = 1 / text.length;
  const router = useRouter();
  const reboot = router.query.reboot;

  useEffect(() => {
    if (reboot) {
      setTimeout(() => router.replace("/boot-up"), duration * 1000 + 1000);
    } else {
      setTimeout(() => router.replace("/shutdown"), duration * 1000 + 1000);
    }
  }, []);

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
