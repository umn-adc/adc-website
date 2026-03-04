import type { OfficerProfile } from '@/lib/officers';

export type OfficerSectionProps = {
  officer: OfficerProfile;
};

export type OfficerLink = OfficerProfile['links'][number];
