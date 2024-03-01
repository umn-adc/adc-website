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
import FooterSocialLink from './FooterSocialLink';

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
        <FooterSocialLink href="https://www.discord.gg/XCqJEbv">
          <FaDiscord size={30} />
        </FooterSocialLink>
        <FooterSocialLink href="https://github.com/umn-adc">
          <FaGithub size={30} />
        </FooterSocialLink>
        <FooterSocialLink href="https://www.linkedin.com/company/app-developers-club/about/">
          <FaLinkedin size={30} />
        </FooterSocialLink>
        <FooterSocialLink href="https://www.instagram.com/appdev_umn/">
          <FaInstagram size={30} />
        </FooterSocialLink>
        <FooterSocialLink href="https://www.facebook.com/appdevelopersclubumn/">
          <FaFacebook size={30} />
        </FooterSocialLink>
        <FooterSocialLink href="https://www.youtube.com/channel/UC69SHPWie_SrO-Gtpr8vHuw">
          <FaYoutube size={30} />
        </FooterSocialLink>
      </FooterLinkContainer>
      <Divider />
      <p>© 2023 App Developers Club</p>
    </Container>
  );
};

export default Footer;
