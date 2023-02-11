import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

import { sessionStorage } from '@/lib/localStorage';
import { unstringify } from '@/lib/string';

import { Editor } from '@/components/Editor';
import Layout from '@/components/layout/Layout';

export default function BlogPage() {
  const isLogin = sessionStorage.getItem('isLogin');
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const post = (sessionStorage.getItem('editorDocState') as string) ?? '';
  const [docState, setDocState] = useState<string>(post);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLogin) {
      router.replace('/login');
    }
  });

  const trimmedString = unstringify(
    docState.substring(1, post.length - 1) ?? ''
  );

  return (
    <Layout>
      <div className='flex h-full'>
        <div className='h-full w-1/2'>
          <Editor onChange={(doc) => setDocState(doc)} />
        </div>
        {isMounted ? (
          <ReactMarkdown
            className='unreset rendered-markdown'
            remarkPlugins={[remarkBreaks]}
          >
            {trimmedString}
          </ReactMarkdown>
        ) : null}
      </div>
    </Layout>
  );
}
