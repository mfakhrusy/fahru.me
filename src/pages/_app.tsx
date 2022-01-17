import { Provider } from "../Provider";
import Head from "next/head";
import "xterm/css/xterm.css";
import "@/styles/globals.css";
import "@/styles/calendar.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Head>
        <title>Fahru Personal Site</title>
        <link
          rel="preload"
          href="https://blog.fakhrusy.com"
          as="document"
        ></link>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
