import styled from 'styled-components';

export const Picture = styled.img`
  border-radius: 50%;
  aspect-ratio: 1;
  height: 100px;
  width: 100px;
  object-fit: cover;
  transition: all 300ms var(--custom-ease);

  border: 5px solid ${({ theme }) => theme.colors.secondary};
`;
interface ContainerProps {
  message?: string;
}

export const Container = styled.div<ContainerProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: center;
  place-content: center;
  place-items: center;
  position: relative;
  cursor: default;
  user-select: none;

  > h2 {
    font-weight: 600;
    font-size: 20px;
    box-sizing: border-box;
    border-bottom: 7px solid ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.contrastInverted};
  }

  > h3 {
    font-weight: 400;
    // margin-top: -5px;
    font-size: 15px;
    color: ${({ theme }) => theme.colors.contrastInverted};
  }

  &:after {
    opacity: 0;
    position: absolute;
    bottom: 77%;
    width: max-content;
    max-width: 180px;
    z-index: 100;
    left: 50%;
    transform: translateX(-50%);
    content: '${({ message }) => message}';
    padding: 10px 15px;
    color: ${({ theme }) => theme.colors.contrastInverted};
    background-color: ${({ theme }) => theme.colors.secondaryDarker};
    border-radius: 20px;
  }

  &:hover {
    ${Picture} {
      transform: scale(1.05) !important;
    }
    &:after {
      bottom: 90%;
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    &:after {
      transition: all 200ms var(--custom-ease);
    }

    &:hover {
      transition: all 200ms var(--custom-ease);
    }
  }
`;
