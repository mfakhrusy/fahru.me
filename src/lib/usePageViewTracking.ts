import { client } from "@/api/supabase";
import isEmptyObject from "@/lib/isEmptyObject";
import { useRouter } from "next/router";
import { useEffect } from "react";
import UAParser from "ua-parser-js";

const usePageViewTracking = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchId = async () => {
      // const userAgent = new Userwindow.navigator.userAgent;
      const parser = new UAParser();
      parser.setUA(window.navigator.userAgent);
      const result = parser.getResult();
      console.log(result.device);
      const { data, error } = await client.from("pageview").insert([
        {
          uri: router.pathname,
          ua_cpu: isEmptyObject(result.cpu) ? "" : result.cpu.architecture,
          ua_os: `${result.os.name} ${result.os.version}`,
          ua_browser: `${result.browser.name} ${result.browser.version}`,
          ua_browser_engine: `${result.engine.name} ${result.engine.version}`,
          ua_device: isEmptyObject(result.device)
            ? ""
            : `${result.device.vendor ?? ""} ${result.device.model ?? ""}`,
        },
      ]);

      console.log(result);
    };

    fetchId();
  }, []);
}

export default usePageViewTracking;