import styled from 'styled-components';
import { fadeInUp } from 'styles/global';

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
