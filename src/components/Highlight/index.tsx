import React, { HTMLProps } from 'react';
import { Container, Content, TextSection } from './styles';

interface HighlightProps extends HTMLProps<HTMLDivElement> {
  title: string;
  body: string;
  children: React.ReactNode;
  secondary?: boolean;
  scrollReveal?: boolean;
}

const Highlight: React.FC<HighlightProps> = ({
  title,
  body,
  children,
  secondary,
  scrollReveal,
  ...props
}) => {
  return (
    <Container secondary={secondary} {...props} scrollReveal={scrollReveal}>
      <Content>
        <TextSection scrollReveal={scrollReveal}>
          <h3>{title}</h3>
          <p>{body}</p>
        </TextSection>
        {children}
      </Content>
    </Container>
  );
};

Highlight.defaultProps = {
  secondary: undefined,
  scrollReveal: false,
};

export default Highlight;
