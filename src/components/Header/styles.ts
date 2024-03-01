import styled from 'styled-components';

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70%;
  gap: 5px;
`;

export const Container = styled.div`
  z-index: 500;
  height: 56px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  padding: 0px 100px;

  @media (max-width: 1024px) {
    justify-content: center;
    position: fixed;
    ${Menu} {
      display: none;
    }
  }
`;

export const HomeLink = styled.a`
  > img {
    height: 100%;
  }
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
`;

export const HeaderLink = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 16px;
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
