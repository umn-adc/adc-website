import React, { HTMLProps, ReactNode, useEffect, useRef } from 'react';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import { Container, Content, OuterContainer } from './styles';

interface SectionProps extends HTMLProps<HTMLDivElement> {
  title: string;
  description: string;
  secondary?: boolean;
  children?: React.ReactNode;
  topDecorator?: ReactNode;
  bottomDecorator?: ReactNode;
  scrollReveal?: boolean;
  disableScrollTimeline?: boolean;
}

const Section: React.FC<SectionProps> = ({
  title,
  description,
  children,
  secondary,
  topDecorator,
  bottomDecorator,
  scrollReveal,
  disableScrollTimeline,
  ...props
}) => {
  const { isIntersecting, ref: obsRef } = useIntersectionObserver({
    threshold: 0.8,
  });
  const hasRevealed = useRef<boolean>(false);
  useEffect(() => {
    if (isIntersecting && !hasRevealed.current) hasRevealed.current = true;
  }, [isIntersecting]);

  return (
    <OuterContainer
      scrollReveal={scrollReveal}
      disableScrollTimeline={disableScrollTimeline}
    >
      {topDecorator}
      <Container {...props} alt={secondary}>
        <Content
          ref={obsRef}
          isIntersecting={
            !scrollReveal || hasRevealed.current || isIntersecting
          }
        >
          <h1>{title}</h1>
          <p>{description}</p>
          {children}
        </Content>
      </Container>
      {bottomDecorator}
    </OuterContainer>
  );
};

Section.defaultProps = {
  children: undefined,
  secondary: false,
  topDecorator: undefined,
  bottomDecorator: undefined,
  scrollReveal: false,
  disableScrollTimeline: false,
};

export default Section;
