import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import {
  formatEndline,
  formatStringToFilterIncompleteHtmlTag,
  removeLeadingAndTrailingQuotes,
} from '@/lib/string';

import { useEditorContext } from '@/context/EditorContext';

export default function MarkdownRenderer() {
  const { docState } = useEditorContext();
  const trimmedString = formatStringToFilterIncompleteHtmlTag(
    formatEndline(removeLeadingAndTrailingQuotes(docState))
  );

  return (
    <ReactMarkdown
      className='unreset rendered-markdown font-primary'
      rehypePlugins={[rehypeRaw]}
    >
      {trimmedString}
    </ReactMarkdown>
  );
}
