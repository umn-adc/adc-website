import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import cdd from 'react-syntax-highlighter/dist/esm/styles/prism/coldark-dark';
import omni from 'styles/themes/code/omni';
import { Container } from './styles';

interface CodeBlockProps {
  className?: string | undefined;
  children?: React.ReactNode;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  language,
  children,
  className,
  ...props
}) => {
  return (
    <Container>
      <SyntaxHighlighter
        customStyle={{ borderRadius: 5 }}
        language={
          language || (className?.match(/(?<=language-)\w+/)?.[0] ?? '')
        }
        style={omni as typeof cdd}
        {...props}
      >
        {`${children}`}
      </SyntaxHighlighter>
    </Container>
  );
};

CodeBlock.defaultProps = {
  children: undefined,
  className: '',
  language: undefined,
};

export default CodeBlock;
