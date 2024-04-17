/* eslint-disable react/destructuring-assignment */ // * needed for conditional types
import { LeaderboardType } from 'data/leaderboard';
import React from 'react';
import { ChallengeTooltip, Container } from './styles';

type ChallengeBadgeProps = LeaderboardType[number]['challenges'][number] & {
  number: number;
};

const positionSuffixes = ['st', 'nd', 'rd'];

const getPositionName = (position: number) =>
  `${position}${position <= 3 ? positionSuffixes[position - 1] : 'th'}`;

const positionColors = ['#C9B037', '#cdcdcd', '#AD8A56'];

const getPositionColor = (position: number) =>
  position <= 3 ? positionColors[position - 1] : '';

const getPositionStyles = (position: number) =>
  position <= 3 ? { backgroundColor: positionColors[position - 1] } : {};

const ChallengeBadge: React.FC<ChallengeBadgeProps> = (props) => {
  return (
    <Container
      position={props.submitted ? props.position : undefined}
      style={props.submitted ? getPositionStyles(props.position) : {}}
    >
      {props.number}
      <ChallengeTooltip>
        {props.submitted ? (
          <p style={{ width: 'max-content' }}>
            <span
              style={{
                fontWeight: 'bold',
                color: getPositionColor(props.position),
              }}
            >
              {getPositionName(props.position)}
            </span>
            &nbsp;
            <span style={{ fontFamily: 'NotoSansMono' }}>{props.points}</span>
          </p>
        ) : (
          <p style={{ width: 'max-content' }}>No submission</p>
        )}
      </ChallengeTooltip>
    </Container>
  );
};

export default ChallengeBadge;
