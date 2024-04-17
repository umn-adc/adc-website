import styled from 'styled-components';

export const Container = styled.button`
  opacity: 0.8;
  border-radius: 20px;
  padding: 2px;
  font-family: 'NotoSans';
  font-weight: 600;
  color: ${({ theme }) => theme.colors.contrast};
  background-color: transparent;
  border: none;
  transition: opacity 200ms var(--custom-ease);
  flex: 1;
  z-index: 10;

  &:enabled,
  &:not([disabled]):hover {
    opacity: 1;
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.2;
  }
`;
