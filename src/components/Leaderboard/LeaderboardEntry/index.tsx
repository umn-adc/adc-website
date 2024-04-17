import React, { forwardRef } from 'react';
import { LeaderboardType } from 'data/leaderboard';
import {
  ChallengesContainer,
  Container,
  Name,
  Points,
  Position,
} from './styles';
import ChallengeBadge from './ChallengeBadge';

type LeaderboardEntryProps = LeaderboardType[number] & { position: number };

const positionColors = ['#e6cb41', '#ececec', '#d4ad72'];

const getPositionStyles = (position: number) =>
  position <= 3 ? { backgroundColor: positionColors[position - 1] } : {};

const LeaderboardEntry = forwardRef<HTMLDivElement, LeaderboardEntryProps>(
  ({ name, position, points, challenges }, ref) => {
    return (
      <Container
        ref={ref}
        style={{
          animationDelay: `${1400 + position * 100}ms`,
          ...getPositionStyles(position),
        }}
      >
        <Position>{position}</Position>
        <Name>{name}</Name>
        <Points>{points} points</Points>
        <ChallengesContainer>
          {challenges.map((challenge, index) => (
            <ChallengeBadge {...challenge} number={index + 1} />
          ))}
        </ChallengesContainer>
      </Container>
    );
  }
);

export default LeaderboardEntry;
