import { type PrismProps, Prism } from '@mantine/prism';
import classNames from 'classnames';
import { memo } from 'react';
import { CodeProps } from 'react-markdown/lib/ast-to-react';

type CustomCodeProps = {
  value: string;
  language: PrismProps['language'];
} & CodeProps;

function Code({
  value,
  language,
  inline,
  className,
  children,
  node: _node,
  ...codeProps
}: CustomCodeProps) {
  if (inline) {
    return (
      <code className={className} {...codeProps}>
        {children}
      </code>
    );
  }
  return (
    <pre className={classNames('rounded-md bg-gray-100 p-4', className)}>
      <Prism language={language} {...codeProps}>{value}</Prism>
    </pre>
  );
}

export default memo(Code)
