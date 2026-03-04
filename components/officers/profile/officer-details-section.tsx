'use client';

import type * as React from 'react';
import type { Project } from '@/components/ui/project-card';
import {
  getOfficerFullName,
  getOfficerGivenNamePossessive,
} from '@/lib/officers';
import type { OfficerSectionProps } from './types';
import {
  getFallbackHighlights,
  getOfficerTenureLabel,
  OfficerCompaniesSection,
  OfficerHighlightsSection,
  OfficerHobbiesSection,
  OfficerOverviewSection,
  OfficerProjectsSection,
  OfficerTechStackSection,
} from './officer-details-section/index';

type OfficerDetailsSectionProps = OfficerSectionProps & {
  projects?: Project[];
};

const OfficerDetailsSection: React.FC<OfficerDetailsSectionProps> = ({
  officer,
  projects = [],
}) => {
  const highlights =
    officer.highlights && officer.highlights.length > 0
      ? officer.highlights
      : getFallbackHighlights(officer);
  const companies = officer.companies ?? [];
  const hobbies = officer.hobbies ?? [];
  const tenure = getOfficerTenureLabel(officer.positions);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(87,54,255,0.08),transparent_36%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_88%,rgba(30,61,89,0.06),transparent_42%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="space-y-14">
          <OfficerOverviewSection officer={officer} tenure={tenure} />

          <OfficerTechStackSection
            officerGivenName={officer.givenName}
            techStack={officer.techStack}
          />

          <OfficerHighlightsSection
            highlights={highlights}
            officerId={officer.id}
          />

          <OfficerProjectsSection projects={projects} />

          <OfficerCompaniesSection
            officerGivenName={officer.givenName}
            companies={companies}
          />

          <OfficerHobbiesSection hobbies={hobbies} officerId={officer.id} />
        </div>
      </div>
    </section>
  );
};

export default OfficerDetailsSection;
