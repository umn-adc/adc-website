import type * as React from 'react';
import type { OfficerProfile } from '@/lib/officers';
import ExternalLinkButton from './external-link-button';
import { splitOfficerLinks } from './split-officer-links';

type OfficerActionLinksProps = {
  logo: OfficerProfile['logo'];
  links: OfficerProfile['links'];
};

const OfficerActionLinks: React.FC<OfficerActionLinksProps> = ({
  logo,
  links,
}) => {
  const { portfolioLink, secondaryLinks } = splitOfficerLinks(links);

  return (
    <div
      className={`mt-8 flex flex-wrap gap-4 ${portfolioLink ? '*:first:mr-0.5' : ''}`}
    >
      {portfolioLink ? (
        <ExternalLinkButton
          logo={logo}
          link={portfolioLink}
          variant="primary"
        />
      ) : null}
      {secondaryLinks.map((link) => (
        <ExternalLinkButton logo={logo} key={link.url} link={link} />
      ))}
    </div>
  );
};

export default OfficerActionLinks;
