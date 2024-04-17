import styled from 'styled-components';
import { fadeIn, moveLeft } from 'styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > * > * {
    animation:
      ${moveLeft} 500ms var(--custom-ease) backwards,
      ${fadeIn} 500ms var(--custom-ease) backwards;
  }
`;
