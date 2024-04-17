import styled from 'styled-components';
import { fadeInUp } from 'styles/global';

export const ChallengeTooltip = styled.span`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 105%;
  background-color: ${({ theme }) => theme.colors.secondaryDarker};
  padding: 5px 10px;
  border-radius: 15px;
  opacity: 0;
  transform: scale(0);
  transform-origin: bottom;
  transition: 150ms all var(--custom-ease);
`;

interface ContainerProps {
  position?: number;
}

const positionColors = ['#C9B037', '#cdcdcd', '#AD8A56'];

const getPositionColor = (position: number, defaultColor: string) =>
  position <= 3 ? positionColors[position - 1] : defaultColor;

export const Container = styled.span<ContainerProps>`
  position: relative;
  user-select: none;
  aspect-ratio: 1;
  height: 18px;
  width: 18px;
  font-size: 12px;
  display: flex;
  place-content: center;
  place-items: center;
  border-radius: 50%;
  font-family: 'Bungee';
  color: ${({ theme, position }) =>
    `${theme.colors.primary}${position ? '' : '88'}`};
  background-color: ${({ theme, position }) =>
    position
      ? getPositionColor(position, `${theme.colors.contrast}df`)
      : `${theme.colors.contrast}15`};

  ${ChallengeTooltip} {
    ${({ position }) => (position ? '' : `filter: grayscale()`)}
  }

  &:hover {
    ${ChallengeTooltip} {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
