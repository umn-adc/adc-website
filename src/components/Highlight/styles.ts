import styled from 'styled-components';
import { fadeIn, moveDown, moveLeft, moveRight, moveUp } from 'styles/global';

interface ContainerProps {
  secondary?: boolean;
  scrollReveal?: boolean;
}
export const Content = styled.div``;

export const Container = styled.div<ContainerProps>`
  background-color: ${({ theme, secondary }) =>
    secondary ? theme.colors.secondary : theme.colors.primary};
  width: 100%;
  min-height: 100px;
  display: flex;
  place-content: center;
  place-items: center;
  gap: 20px;

  > ${Content} {
    padding: 40px;
    display: flex;
    flex-direction: ${({ secondary }) => (secondary ? 'row' : 'row-reverse')};
    color: ${({ theme, secondary }) =>
      secondary ? theme.colors.contrastInverted : theme.colors.contrast};
    max-width: 75%;
    place-content: center;
    place-items: center;
    gap: 60px;

    > img {
      max-height: 200px;
    }

    @media (prefers-reduced-motion: no-preference) {
      animation:
        ${({ scrollReveal }) => (scrollReveal ? fadeIn : 'none')} linear
          backwards,
        ${({ scrollReveal, secondary }) =>
            // eslint-disable-next-line no-nested-ternary
            scrollReveal ? (secondary ? moveUp : moveDown) : 'none'}
          linear backwards;
      animation-timeline: view();
      animation-range: 150px 350px;
    }
  }
`;

interface TextSectionProps {
  scrollReveal?: boolean;
  secondary?: boolean;
}

export const TextSection = styled.div<TextSectionProps>`
  display: flex;
  flex-direction: column;
  gap: 10px;

  > h3 {
    font-size: 30px;
    margin-bottom: 10px;
  }

  > p {
    font-size: 18px;
  }

  @media (prefers-reduced-motion: no-preference) {
    > h3 {
      animation:
        ${({ scrollReveal }) => (scrollReveal ? fadeIn : 'none')} linear
          backwards,
        ${({ scrollReveal, secondary }) =>
            // eslint-disable-next-line no-nested-ternary
            scrollReveal ? (secondary ? moveRight : moveLeft) : 'none'}
          linear backwards;
      animation-timeline: view();
      animation-range: 0px 300px;
    }

    > p {
      animation:
        ${({ scrollReveal }) => (scrollReveal ? fadeIn : 'none')} linear
          backwards,
        ${({ scrollReveal, secondary }) =>
            // eslint-disable-next-line no-nested-ternary
            scrollReveal ? (secondary ? moveRight : moveLeft) : 'none'}
          linear backwards;
      animation-timeline: view();
      animation-range: 100px 300px;
    }
  }
`;
