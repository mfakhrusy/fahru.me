import { PrismProps } from '@mantine/prism';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import rehypeRaw from 'rehype-raw';

import { formatStringToFilterIncompleteHtmlTag } from '@/lib/string';

import { useEditorContext } from '@/context/EditorContext';

import Code from './Code';

export default function MarkdownRenderer() {
  const { docState } = useEditorContext();
  const formattedString = formatStringToFilterIncompleteHtmlTag(docState);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ReactMarkdown
      className='unreset rendered-markdown font-primary'
      rehypePlugins={[rehypeRaw]}
      components={{
        code: (props: CodeProps) => {
          const language = props.className?.split(
            '-'
          )[1] as PrismProps['language'];

          const formattedValue = String(props.children)
            .replace(/\n$/, '')
            .replace(/&lt;/g, '<');

          return <Code language={language} value={formattedValue} {...props} />;
        },
      }}
    >
      {formattedString}
    </ReactMarkdown>
  );
}
