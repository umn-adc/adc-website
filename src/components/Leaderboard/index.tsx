import React from 'react';
import FlipMove from 'react-flip-move';
import leaderboard from 'data/leaderboard';
import Entry from './LeaderboardEntry';
import { Container } from './styles';

const Leaderboard = () => {
  return (
    <Container>
      <FlipMove style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {leaderboard.map((item, index) => (
          <Entry {...item} position={index + 1} />
        ))}
      </FlipMove>
    </Container>
  );
};

export default Leaderboard;
