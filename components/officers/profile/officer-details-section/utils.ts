import type { OfficerProfile } from '@/lib/officers';

export const normalizeLookupKey = (value: string): string =>
  value.trim().toLowerCase();

export const getFallbackHighlights = (officer: OfficerProfile): string[] => {
  const currentRole = officer.positions[0]?.position ?? 'Officer';
  const primaryTools = officer.techStack.slice(0, 2).join(' and ');

  return [
    `Served as ${currentRole} and helped guide ADC operations and project direction.`,
    `Contributed technical leadership through ${primaryTools || 'modern development tools'}.`,
    'Supported member growth through workshops, mentorship, and cross-team collaboration.',
  ];
};

export const getOfficerTenureLabel = (
  positions: OfficerProfile['positions']
): string => {
  if (!positions.length) return 'N/A';

  const start = Math.min(...positions.map((position) => position.startYear));
  const end = Math.max(...positions.map((position) => position.endYear));
  const yearCount = end - start;

  if (start === end) return `${start} (${yearCount} year)`;
  return `${start}-${end} (${yearCount} years)`;
};
