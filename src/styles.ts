import styled from 'styled-components';
import { fadeInUp } from 'styles/global';

export const AppContainer = styled.div`
  overflow-x: clip;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media (max-width: 1024px) {
    #page-wrap {
      padding-top: 56px;
    }
  }
`;

export const RouteContainer = styled.div`
  flex: 1;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 45px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
  justify-items: center;
  flex: 1;
  // max-width: 500px;

  > * {
    animation: ${fadeInUp} 500ms var(--custom-ease);
    animation-fill-mode: forwards;
  }
`;

export const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 45px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
  justify-items: center;
  flex: 1;
  // max-width: 500px;

  > * {
    animation: ${fadeInUp} 500ms var(--custom-ease);
    animation-fill-mode: forwards;
  }
`;

interface MainContentProps {
  secondary?: boolean;
}

export const MainContent = styled.div<MainContentProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px 6%;

  > h1 {
    font-size: 36px;
  }

  ${({ theme, secondary }) =>
    secondary
      ? `background-color: ${theme.colors.secondary}; color: ${theme.colors.primary}`
      : ''};
`;
