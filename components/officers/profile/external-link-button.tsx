import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { IconType } from 'react-icons';
import type { OfficerLink } from './types';
import {
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiTwitch,
  SiX,
  SiYoutube,
} from 'react-icons/si';
import { getOfficerLinkLabel, OfficerProfile } from '@/lib/officers';
import OfficerMonochromeLogo from './officer-monochrome-logo';

type ExternalLinkButtonProps = {
  logo: OfficerProfile['logo'];
  link: OfficerLink;
  variant?: 'primary' | 'secondary';
};

const iconMap: Partial<Record<OfficerLink['type'], IconType>> = {
  github: SiGithub,
  linkedin: SiLinkedin,
  x: SiX,
  instagram: SiInstagram,
  youtube: SiYoutube,
  facebook: SiFacebook,
  twitch: SiTwitch,
};

const ExternalLinkButton = ({
  logo,
  link,
  variant = 'secondary',
}: ExternalLinkButtonProps) => {
  const linkLabel = getOfficerLinkLabel(link);
  const Icon = iconMap[link.type];

  if (Icon) {
    return (
      <Link
        href={link.url}
        target="_blank"
        rel="noreferrer"
        aria-label={linkLabel}
        title={linkLabel}
        className="inline-flex items-center justify-center text-white opacity-65 transition-opacity duration-200 hover:opacity-100"
      >
        <Icon className="size-5" aria-hidden />
      </Link>
    );
  }

  const className =
    variant === 'primary'
      ? 'group inline-flex items-center gap-2 rounded-full bg-white text-indigo px-5 py-2.5 text-sm font-semibold transition hover:bg-white/90'
      : 'inline-flex items-center rounded-full border border-white/35 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10';

  return (
    <Link
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className={className}
    >
      {!!logo && (
        <OfficerMonochromeLogo
          src={logo}
          tone={variant === 'primary' ? 'indigo' : 'white'}
          size={16}
        />
      )}
      {linkLabel}
      {variant === 'primary' ? (
        <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
      ) : null}
    </Link>
  );
};

export default ExternalLinkButton;
