import type * as React from 'react';

const OfficerHeroBackground: React.FC = () => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(198,235,247,0.25),transparent_50%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.2),transparent_45%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_80%,rgba(0,0,0,0.35),transparent_55%)]" />
  </div>
);

export default OfficerHeroBackground;
