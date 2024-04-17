interface CommonChallengeRecord {
  id: string;
}

interface ChallengeRecordSubmitted {
  submitted: true;
  points: number;
  position: number;
}

interface ChallengeRecordNotSubmitted {
  submitted: false;
}

export type ChallengeRecord = CommonChallengeRecord &
  (ChallengeRecordSubmitted | ChallengeRecordNotSubmitted);

export type LeaderboardType = {
  name: string;
  points: number;
  challenges: ChallengeRecord[];
}[];

const leaderboard: LeaderboardType = [
  {
    name: '_dajeff',
    points: 120,
    challenges: [
      { id: 'challenge1', submitted: false },
      { id: 'challenge2', points: 120, position: 1, submitted: true },
      { id: 'challenge3', submitted: false },
      { id: 'challenge4', submitted: false },
      { id: 'challenge5', submitted: false },
    ],
  },
  {
    name: 'whatshisname.',
    points: 115,
    challenges: [
      { id: 'challenge1', submitted: false },
      { id: 'challenge2', submitted: false },
      { id: 'challenge3', submitted: false },
      { id: 'challenge4', points: 115, position: 1, submitted: true },
      { id: 'challenge5', submitted: false },
    ],
  },
  {
    name: 'is_this_maddie',
    points: 15,
    challenges: [
      { id: 'challenge1', points: 15, position: 1, submitted: true },
      { id: 'challenge2', points: 0, position: 2, submitted: true },
      { id: 'challenge3', submitted: false },
      { id: 'challenge4', submitted: false },
      { id: 'challenge5', submitted: false },
    ],
  },
  {
    name: 'ethangang',
    points: 15,
    challenges: [
      { id: 'challenge1', points: 15, position: 2, submitted: true },
      { id: 'challenge2', submitted: false },
      { id: 'challenge3', submitted: false },
      { id: 'challenge4', submitted: false },
      { id: 'challenge5', submitted: false },
    ],
  },
  {
    name: 'yunobuonngu',
    points: 3,
    challenges: [
      { id: 'challenge1', points: 3, position: 3, submitted: true },
      { id: 'challenge2', submitted: false },
      { id: 'challenge3', submitted: false },
      { id: 'challenge4', submitted: false },
      { id: 'challenge5', submitted: false },
    ],
  },
];

export default leaderboard;
