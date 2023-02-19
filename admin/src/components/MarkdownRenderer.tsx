import { PrismProps } from '@mantine/prism';
import ReactMarkdown from 'react-markdown';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import rehypeRaw from 'rehype-raw';

import { formatStringToFilterIncompleteHtmlTag } from '@/lib/string';

import { useEditorContext } from '@/context/EditorContext';

import Code from './Code';

export default function MarkdownRenderer() {
  const { docState } = useEditorContext();
  const formattedString = formatStringToFilterIncompleteHtmlTag(docState);

  return (
    <ReactMarkdown
      className='unreset rendered-markdown font-primary'
      rehypePlugins={[rehypeRaw]}
      components={{
        code: (props: CodeProps) => {
          const language = props.className?.split(
            '-'
          )[1] as PrismProps['language'];

          return (
            <Code
              language={language}
              value={String(props.children).replace(/\n$/, '')}
              {...props}
            />
          );
        },
      }}
    >
      {formattedString}
    </ReactMarkdown>
  );
}
