import type * as React from 'react';
import { cn } from '@/lib/utils';
import { OFFICER_CARD_CLASS_NAME } from './constants';

type OfficerCardProps = {
  title: string;
  className?: string;
  children: React.ReactNode;
};

const OfficerCard: React.FC<OfficerCardProps> = ({
  title,
  className,
  children,
}) => (
  <article className={cn(OFFICER_CARD_CLASS_NAME, className)}>
    <h2 className="font-sans text-2xl font-semibold mb-4">{title}</h2>
    {children}
  </article>
);

export default OfficerCard;
