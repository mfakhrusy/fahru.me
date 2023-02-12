import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { sessionStorage } from '@/lib/localStorage';
import {
  formatEndline,
  formatStringToFilterIncompleteHtmlTag,
  removeLeadingAndTrailingQuotes,
} from '@/lib/string';

import { Editor } from '@/components/Editor';
import Layout from '@/components/layout/Layout';

export default function BlogPage() {
  const isLogin = sessionStorage.getItem('isLogin');
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const state = sessionStorage.getItem('editorState');
  const initialDoc = JSON.parse(state as string)?.doc ?? '';
  const [docState, setDocState] = useState<string>(initialDoc);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLogin) {
      router.replace('/login');
    }
  });

  const trimmedString = formatStringToFilterIncompleteHtmlTag(
    formatEndline(removeLeadingAndTrailingQuotes(docState))
  );

  console.log(
    // initialDoc,
    // docState,
    removeLeadingAndTrailingQuotes(trimmedString)
  );

  return (
    <Layout>
      <div className='flex h-full'>
        <div className='h-full w-1/2'>
          <Editor onChange={setDocState} />
        </div>
        {isMounted ? (
          <ReactMarkdown
            className='unreset rendered-markdown'
            rehypePlugins={[rehypeRaw]}
          >
            {trimmedString}
          </ReactMarkdown>
        ) : null}
      </div>
    </Layout>
  );
}
