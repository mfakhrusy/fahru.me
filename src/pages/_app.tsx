import { Provider } from "../Provider";
import "../../styles/globals.css";
import "xterm/css/xterm.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
