import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import { sessionStorage } from '@/lib/localStorage';

import Layout from '@/components/layout/Layout';
import ReactCodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { Editor } from '@/components/Editor';
import { marked } from 'marked';

export default function BlogPage() {
  const isLogin = sessionStorage.getItem('isLogin');
  const router = useRouter();

  const post = (sessionStorage.getItem('editorDocState') as string) ?? '';

  console.log(post);

  const onChange = useCallback((value, viewUpdate) => {
    console.log(value);
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
          <Editor />
        </div>
        <div
          className='h-full w-1/2 blog-renderer'
          dangerouslySetInnerHTML={{
            __html: marked(
              'Test markdown render\n\n\n# hello world\n\nac\nasc\nas\ncas\ncas\ndas\n\n1. 3\n2. 3\n\n3. 4\n\n* asdasd\n  * asdas\n  * asdasdsa\n'
            ),
          }}
        ></div>
      </div>
    </Layout>
  );
}
