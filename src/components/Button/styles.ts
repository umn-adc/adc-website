import styled from 'styled-components';

export const Main = styled.button`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 20px;
  border-radius: 5px;
  padding: 12px 15px;
  border: none;
  transition: all 150ms var(--custom-ease);
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
    filter: brightness(0.9);
  }

  &:focus,
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accentLight};
  }
`;
