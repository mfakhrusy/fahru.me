import type { AppProps } from 'next/app';

import '@/styles/unreset.css';
import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/style.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
