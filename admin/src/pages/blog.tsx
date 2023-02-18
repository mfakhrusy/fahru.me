import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { sessionStorage } from '@/lib/sessionStorage';

import { Editor } from '@/components/Editor';
import Layout from '@/components/layout/Layout';
import MarkdownRenderer from '@/components/MarkdownRenderer';

import { useEditorContext } from '@/context/EditorContext';

export default function BlogPage() {
  const isLogin = sessionStorage.getItem('isLogin');
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const { setDocState } = useEditorContext();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLogin) {
      router.replace('/login');
    }
  });

  return (
    <Layout>
      <div className='flex h-full'>
        <div className='h-full w-1/2'>
          <Editor onChange={setDocState} />
        </div>
        {isMounted ? <MarkdownRenderer /> : null}
      </div>
    </Layout>
  );
}
