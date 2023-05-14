import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
  children: string;
};

export function Markdown({ children }: Props) {
  return (
    <ReactMarkdown className="react-markdown" rehypePlugins={[rehypeRaw]}>
      {children}
    </ReactMarkdown>
  );
}
