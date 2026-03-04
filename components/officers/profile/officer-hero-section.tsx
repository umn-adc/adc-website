import type * as React from 'react';
import OfficerActionLinks from './officer-action-links';
import OfficerHeroBackground from './officer-hero-background';
import OfficerModelPreview from './officer-model-preview';
import OfficerPositionBadges from './officer-position-badges';
import OfficerMonochromeLogo from './officer-monochrome-logo';
import type { OfficerSectionProps } from './types';
import { getOfficerFullName } from '@/lib/officers';
import DecryptedText from '@/components/ui/decrypted-text';

const formatClassYear = (classYear?: number): string | undefined => {
  if (!classYear) return undefined;
  const lastTwo = String(classYear).slice(-2);
  return `'${lastTwo}`;
};

const OfficerHeroSection: React.FC<OfficerSectionProps> = ({ officer }) => {
  const profileMeta = [
    officer.college,
    formatClassYear(officer.classYear),
    officer.major,
  ].filter(Boolean);
  const officerFullName = getOfficerFullName(officer);

  return (
    <section className="relative z-10 overflow-hidden bg-indigo text-white pt-28 md:pt-36 pb-16 md:pb-20">
      <OfficerHeroBackground />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <div>
          <OfficerMonochromeLogo
            className="mb-3"
            src={officer.logo}
            tone="white"
            size={40}
            fallbackSrc="/adc-star-white.svg"
            alt={officer.logo ? 'Officer logo' : 'ADC logo'}
          />
          <DecryptedText
            speed={100}
            maxIterations={100}
            animateOn="view"
            sequential
            parentClassName="font-mono text-xs text-white/60 mb-3"
            text={officer.id}
          />
          <h1 className="font-sans text-4xl md:text-6xl font-bold tracking-tight">
            {officerFullName}
          </h1>
          {profileMeta.length > 0 ? (
            <p className="mt-2 font-sans text-sm md:text-base text-white/75">
              {officer.college} {formatClassYear(officer.classYear)}
              {' | '}
              {officer.major}
            </p>
          ) : null}
          <OfficerPositionBadges positions={officer.positions} />

          <p className="mt-6 font-serif text-lg text-white/85 max-w-2xl text-pretty">
            {officer.bioShort}
          </p>
          <OfficerActionLinks logo={officer.logo} links={officer.links} />
        </div>
        <OfficerModelPreview modelUrl={officer.modelUrl} />
      </div>
    </section>
  );
};

export default OfficerHeroSection;
