import type { OfficerProfile } from '@/lib/officers';

export const splitOfficerLinks = (links: OfficerProfile['links']) => {
  const portfolioLink = links.find((link) => link.type === 'portfolio');
  const secondaryLinks = links.filter((link) => link !== portfolioLink);

  return {
    portfolioLink,
    secondaryLinks,
  };
};
