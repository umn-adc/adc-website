import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;
`;

interface TopBarProps {
  nTabs: number;
  selectedTab: number;
  offset: number;
  width: number;
}

export const TopBar = styled.span<TopBarProps>`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-radius: 20px;
  height: 40px;
  background-color: #cecece;
  outline: 3px solid #cecece;
  position: relative;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    height: 100%;
    width: 100%;
    border-radius: ${({ width }) => 20 / width}px / 20px;
    transition: transform 200ms var(--custom-ease);
    transform-origin: left;
    transform: translateX(${({ offset }) => offset}px)
      scaleX(${({ width }) => width});
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrast};
  padding: 20px;
`;
