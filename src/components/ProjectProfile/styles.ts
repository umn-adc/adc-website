import styled from 'styled-components';

export const Container = styled.a`
  padding: 20px;
  padding-top: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  place-items: center;
  place-content: center;
  gap: 10px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrast};

  > h3 {
    font-size: 16px;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 5px;
      background-color: ${({ theme }) => theme.colors.accent};
      transform-origin: left;
      transform: scaleX(0);
      transition: transform 200ms var(--custom-ease);
    }
  }

  &:hover {
    > div {
      transform: scale(1.1) rotate(4deg);
    }

    > h3 {
      &:after {
        transform: scaleX(1);
      }
    }
  }
`;

export const Icon = styled.div`
  transition: all 200ms var(--custom-ease);
  border-radius: 20px;
  height: 70px;
  width: 70px;
  aspect-ratio: 1;
  overflow: hidden;
  > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
