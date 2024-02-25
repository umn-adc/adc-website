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

  h3 {
    font-size: 16px;
  }

  &:hover {
    > div {
      transform: scale(1.1) rotate(4deg);
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
