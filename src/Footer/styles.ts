import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  place-content: center;
  padding: 20px;
  gap: 5px;

  > p {
    color: #afafaf;
    font-weight: 300;
    font-size: 12px;
  }

  > img {
    user-select: none;
    -webkit-user-drag: none;
  }
`;

export const Divider = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 5px;
  background-color: #c7c7c7;
  margin: 10px 0px;
`;

export const FooterLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

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

export const FooterLink = styled.a`
  border-radius: 5px;
  padding: 10px;
  transition: var(--custom-ease) 150ms all;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    filter: brightness(-1);
    background-color: #f0f0f0;
  }
`;
