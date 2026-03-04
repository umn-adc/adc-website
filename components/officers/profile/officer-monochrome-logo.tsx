import type * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type OfficerMonochromeLogoProps = {
  src?: string;
  tone: 'white' | 'indigo';
  size: number;
  className?: string;
  fallbackSrc?: string;
  alt?: string;
};

const toneClassMap: Record<OfficerMonochromeLogoProps['tone'], string> = {
  white: 'text-white',
  indigo: 'text-indigo',
};

const OfficerMonochromeLogo: React.FC<OfficerMonochromeLogoProps> = ({
  src,
  tone,
  size,
  className,
  fallbackSrc,
  alt = '',
}) => {
  if (!src) {
    if (!fallbackSrc) return null;

    return (
      <Image
        src={fallbackSrc}
        alt={alt}
        width={size}
        height={size}
        className={className}
        aria-hidden={alt ? undefined : true}
      />
    );
  }

  const maskStyle = {
    width: size,
    height: size,
    backgroundColor: 'currentColor',
    WebkitMaskImage: `url("${src}")`,
    maskImage: `url("${src}")`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
  } as React.CSSProperties;

  return (
    <span
      className={cn('block shrink-0', toneClassMap[tone], className)}
      style={maskStyle}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    />
  );
};

export default OfficerMonochromeLogo;
