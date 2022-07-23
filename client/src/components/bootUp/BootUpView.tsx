import {
  TerminalProcessAnimation,
  AnimatedText,
} from "@/components/shared/TerminalProcessAnimation";
import useIsTouchDevice from "@/lib/useIsTouchDevice";

const makeText: (isTouchDevice: boolean) => Array<AnimatedText> = (
  isTouchDevice
) => {
  const lastElement: AnimatedText = isTouchDevice
    ? {
        value: "Please tap anywhere to continue",
        status: "Ok",
      }
    : {
        value: "Please press ENTER/RETURN to continue",
        status: "Ok",
      };

  return [
    { value: "Starting the site", status: "Ok" },
    { value: "Loading . . .", status: "Loading" },
    { value: "Unexpected error occurred", status: "Error" },
    { value: "Retrying", status: "Ok" },
    { value: "Loading . . .", status: "Loading" },
    { value: "Retrying", status: "Ok" },
    { value: "Loading . . .", status: "Loading" },
    { value: "Retrying", status: "Ok" },
    { value: "Loading . . .", status: "Loading" },
    { value: "Retrying", status: "Ok" },
    { value: "Loading . . .", status: "Loading" },
    { value: "It's failed, sorry :(", status: "Error" },
    { value: ". . .", status: "Loading" },
    { value: ". . .", status: "Loading" },
    { value: "Still fai-", status: "Error" },
    { value: "It's successful now", status: "Ok" },
    { value: "bip bop I'm a robot", status: "Ok" },
    lastElement,
  ];
};

export function BootUpView() {
  const isTouchDevice = useIsTouchDevice();

  return <TerminalProcessAnimation text={makeText(isTouchDevice)} />;
}
