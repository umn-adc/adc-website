import styled from 'styled-components';

export const Container = styled.a`
  color: initial;
  text-decoration: none;

  svg {
    padding: 0 5px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 200ms var(--custom-ease);

    &:hover {
      transform: translateY(-3px);
    }
  }
`;
