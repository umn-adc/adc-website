import styled, { keyframes } from 'styled-components';
import Waves from 'assets/svg/tweaked.svg';
// import Waves from 'assets/svg/purple-waves.svg';
// import Waves from 'assets/svg/dark-waves.svg';
// import Waves from 'assets/svg/green-waves.svg';

const parallax = keyframes`
  from {
    background-position: 50% 50%;
  }
  to {
    background-position: 50% 78%;
  }
`;

export const Container = styled.div`
  background-image: url(${Waves});
  // background-blend-mode: hue;
  background-position: 50% 78%;
  background-size: cover;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  place-content: center;
  place-items: center;
  padding: 60px 20px;
  min-height: 400px;
  // width: 100%;
  flex: 1;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.secondary};

  > img {
    width: 35%;
  }

  @media (prefers-reduced-motion: no-preference) {
    animation: ${parallax} linear;
    animation-timeline: view();
  }

  @media (max-width: 1024px) {
    > img {
      width: 90%;
    }
  }
`;

export const ButtonsContainer = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  place-items: center;
  place-content: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;
