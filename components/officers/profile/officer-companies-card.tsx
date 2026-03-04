import type * as React from 'react';
import { BriefcaseBusiness } from 'lucide-react';
import type { OfficerProfile } from '@/lib/officers';
import OfficerCard from './officer-card';

type OfficerCompaniesCardProps = {
  companies?: OfficerProfile['companies'];
};

const OfficerCompaniesCard: React.FC<OfficerCompaniesCardProps> = ({
  companies,
}) => {
  if (!companies || companies.length === 0) {
    return null;
  }

  return (
    <OfficerCard title="Companies worked at" className="lg:col-span-3">
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {companies.map((company) => (
          <li
            key={company}
            className="inline-flex items-center gap-2 rounded-xl bg-muted/60 px-4 py-3 text-sm"
          >
            <BriefcaseBusiness className="size-4 text-muted-foreground" />
            {company}
          </li>
        ))}
      </ul>
    </OfficerCard>
  );
};

export default OfficerCompaniesCard;
