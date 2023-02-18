import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { formatStringToFilterIncompleteHtmlTag } from '@/lib/string';

import { useEditorContext } from '@/context/EditorContext';

export default function MarkdownRenderer() {
  const { docState } = useEditorContext();
  const trimmedString = formatStringToFilterIncompleteHtmlTag(docState);

  return (
    <ReactMarkdown
      className='unreset rendered-markdown font-primary'
      rehypePlugins={[rehypeRaw]}
    >
      {/* {("doc\n\n\n\n")} */}
      {trimmedString}
    </ReactMarkdown>
  );
}
