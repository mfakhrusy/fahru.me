import { Provider } from "../Provider";
import "../../styles/globals.css";
import "xterm/css/xterm.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Head>
        <title>Fahru Personal Site</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
