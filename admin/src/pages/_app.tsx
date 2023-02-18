import type { AppProps } from 'next/app';

import '@/styles/unreset.css';
import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/style.css';

import EditorContextProvider from '@/context/EditorContext';
import UIContextProvider from '@/context/UIContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIContextProvider>
      <EditorContextProvider>
        <Component {...pageProps} />
      </EditorContextProvider>
    </UIContextProvider>
  );
}

export default MyApp;
