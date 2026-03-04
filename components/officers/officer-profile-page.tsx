import type * as React from 'react';
import type { OfficerProfile } from '@/lib/officers';
import type { Project } from '@/components/ui/project-card';
import {
  OfficerDetailsSection,
  OfficerHeroSection,
} from '@/components/officers/profile';

type OfficerProfilePageProps = {
  officer: OfficerProfile;
  projects?: Project[];
};

const OfficerProfilePage: React.FC<OfficerProfilePageProps> = ({
  officer,
  projects = [],
}) => {
  return (
    <main className="relative">
      <OfficerHeroSection officer={officer} />
      <OfficerDetailsSection officer={officer} projects={projects} />
    </main>
  );
};

export default OfficerProfilePage;
