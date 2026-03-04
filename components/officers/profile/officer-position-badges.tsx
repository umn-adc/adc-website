import type * as React from 'react';
import { Badge } from '@/components/ui/badge';
import type { OfficerProfile } from '@/lib/officers';

type OfficerPositionBadgesProps = {
  positions: OfficerProfile['positions'];
};

const formatPositionRange = ({
  startYear,
  endYear,
}: OfficerProfile['positions'][number]): string =>
  startYear === endYear ? `${startYear}` : `${startYear}-${endYear}`;

const OfficerPositionBadges: React.FC<OfficerPositionBadgesProps> = ({
  positions,
}) => (
  <div className="mt-5 flex flex-wrap gap-2">
    {positions.map((position) => (
      <Badge
        key={`${position.position}-${position.startYear}-${position.endYear}`}
        className="bg-white/15 border-white/20 text-white hover:bg-white/15"
      >
        <span className="text-white/60">{formatPositionRange(position)}</span>
        {position.position}
      </Badge>
    ))}
  </div>
);

export default OfficerPositionBadges;
