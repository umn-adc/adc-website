import styled from 'styled-components';
import { ProfileContainer, ProjectsContainer } from 'styles';
import { fadeIn, fadeInUp, zoomOut } from 'styles/global';

interface OuterContainerProps {
  scrollReveal?: boolean;
  contentVisible?: boolean;
  disableScrollTimeline?: boolean;
}

interface ContainerProps {
  alt?: boolean;
}

interface ContentProps {
  isIntersecting?: boolean;
}

export const TopDecoratorContainer = styled.div`
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  margin: 0;
  margin-bottom: -5px;
`;
export const BottomDecoratorContainer = styled.div`
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  margin: 0;
`;

export const Content = styled.div<ContentProps>`
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: center;
  place-content: center;
  place-items: center;
  max-width: 75%;

  > h1 {
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 15px;
  }

  > p {
    font-size: 20px;
  }

  @media (prefers-reduced-motion: no-preference) {
    > h1 {
      opacity: 0;
      animation: ${({ isIntersecting }) => (isIntersecting ? fadeInUp : 'none')}
        1200ms var(--custom-ease);
      animation-fill-mode: forwards;
    }

    > p {
      opacity: 0;
      animation: ${({ isIntersecting }) => (isIntersecting ? fadeInUp : 'none')}
        1200ms var(--custom-ease);
      animation-delay: 700ms;
      animation-fill-mode: forwards;
    }

    > ${ProfileContainer}, ${ProjectsContainer} {
      > * {
        opacity: 0;
        ${({ isIntersecting }) =>
          isIntersecting ? '' : 'animation: none !important'};
      }
    }
  }
`;

export const OuterContainer = styled.div<OuterContainerProps>`
  > img {
    -webkit-user-drag: none;
  }
  @media (prefers-reduced-motion: no-preference) {
    animation:
      ${({ scrollReveal, disableScrollTimeline }) =>
          scrollReveal && !disableScrollTimeline ? fadeIn : 'none'}
        linear backwards,
      ${({ scrollReveal, disableScrollTimeline }) =>
          scrollReveal && !disableScrollTimeline ? zoomOut : 'none'}
        linear backwards;
    ${({ disableScrollTimeline }) =>
      !disableScrollTimeline
        ? `animation-timeline: view();
    animation-range: 200px 600px;`
        : ''}
  }
`;

export const Container = styled.div<ContainerProps>`
  display: flex;
  width: 100%;
  min-height: 200px;
  place-content: center;
  place-items: center;
  overflow: hidden;
  background-color: ${({ theme, alt }) =>
    alt ? theme.colors.primary : theme.colors.secondaryDark};
  color: ${({ theme, alt }) =>
    alt ? theme.colors.contrast : theme.colors.contrastInverted};
`;
