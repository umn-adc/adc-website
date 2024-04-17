import React, { HTMLProps, ReactNode, useEffect, useRef } from 'react';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import {
  BottomDecoratorContainer,
  Container,
  Content,
  OuterContainer,
  TopDecoratorContainer,
} from './styles';

interface SectionProps extends HTMLProps<HTMLDivElement> {
  title: string;
  description: string;
  secondary?: boolean;
  children?: React.ReactNode;
  topDecorator?: ReactNode;
  bottomDecorator?: ReactNode;
  scrollReveal?: boolean;
  disableScrollTimeline?: boolean;
  animationDelay?: number;
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
  animationDelay,
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
      {...props}
      scrollReveal={scrollReveal}
      disableScrollTimeline={disableScrollTimeline}
    >
      <TopDecoratorContainer>{topDecorator}</TopDecoratorContainer>
      <Container alt={secondary}>
        <Content
          animationDelay={animationDelay}
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
      <BottomDecoratorContainer>{bottomDecorator}</BottomDecoratorContainer>
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
  animationDelay: 0,
};

export default Section;
