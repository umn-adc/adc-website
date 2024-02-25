import React from 'react';
import ADCLogo from 'assets/images/ADC_Logo_Blue.png';
import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa';
import { Container, Divider, FooterLink, FooterLinkContainer } from './styles';

const Footer: React.FC = () => {
  return (
    <Container>
      <img
        src={ADCLogo}
        alt="adc logo"
        height={35}
        style={{ filter: 'grayscale()', opacity: 0.4 }}
      />
      <FooterLinkContainer>
        <FooterLink>Home</FooterLink>
        <FooterLink>Officers</FooterLink>
        <FooterLink>Events</FooterLink>
      </FooterLinkContainer>
      <FooterLinkContainer>
        <FaDiscord size={30} />
        <FaGithub size={30} />
        <FaLinkedin size={30} />
        <FaInstagram size={30} />
        <FaFacebook size={30} />
        <FaYoutube size={30} />
      </FooterLinkContainer>
      <Divider />
      <p>© 2023 App Developers Club</p>
    </Container>
  );
};

export default Footer;
