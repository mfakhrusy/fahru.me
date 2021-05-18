import { useRouter } from "next/router";
import { useEffect } from "react";
import { BootUpView } from "@/components/bootUp/BootUpView";
import { BlackTerminalPage } from "@/components/shared/BlackTerminalPage";
import { client } from "@/api/supabase";
import UAParser from "ua-parser-js";
import isEmptyObject from "@/lib/isEmptyObject";
import usePageViewTracking from "@/lib/usePageViewTracking";

export default function BootUpScreen() {
  const router = useRouter();

  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        router.replace("/home");
      }
    };

    const touchEventHandler = () => {
      router.replace("/home");
    };

    window.addEventListener("keydown", eventHandler);
    window.addEventListener("touchend", touchEventHandler);

    return () => {
      window.removeEventListener("keydown", eventHandler);
      window.removeEventListener("touchend", touchEventHandler);
    };
  });

  usePageViewTracking();

  // useEffect(() => {
  //   const fetchId = async () => {
  //     // const userAgent = new Userwindow.navigator.userAgent;
  //     const parser = new UAParser();
  //     parser.setUA(window.navigator.userAgent);
  //     const result = parser.getResult();
  //     console.log(result.device);
  //     const { data, error } = await client.from("pageview").insert([
  //       {
  //         uri: router.pathname,
  //         ua_cpu: isEmptyObject(result.cpu) ? "" : result.cpu.architecture,
  //         ua_os: `${result.os.name} ${result.os.version}`,
  //         ua_browser: `${result.browser.name} ${result.browser.version}`,
  //         ua_browser_engine: `${result.engine.name} ${result.engine.version}`,
  //         ua_device: isEmptyObject(result.device)
  //           ? ""
  //           : `${result.device.vendor ?? ""} ${result.device.model ?? ""}`,
  //       },
  //     ]);

  //     console.log(result);
  //   };

  //   fetchId();
  // }, []);

  return (
    <BlackTerminalPage>
      <BootUpView />
    </BlackTerminalPage>
  );
}
