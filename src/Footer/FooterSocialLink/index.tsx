import React, { HTMLProps } from 'react';
import { Container } from './styles';

interface FooterSocialLinkProps extends HTMLProps<HTMLAnchorElement> {}

const FooterSocialLink: React.FC<FooterSocialLinkProps> = ({
  children,
  ...props
}) => {
  return (
    <Container target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </Container>
  );
};

export default FooterSocialLink;
