import React from 'react';
import ADCLogo from 'assets/images/ADC_Logo_Blue.png';
import { FaGithub } from 'react-icons/fa';
import { Container, HeaderLink, HomeLink, Menu } from './styles';

const Header = () => {
  return (
    <Container>
      <HomeLink href="/">
        <img src={ADCLogo} alt="ADC logo" />
      </HomeLink>
      <Menu>
        <HeaderLink>Home</HeaderLink>
        <HeaderLink>Officers</HeaderLink>
        <HeaderLink>Events</HeaderLink>
        <HeaderLink style={{ borderRadius: '50%' }}>
          <FaGithub />
        </HeaderLink>
      </Menu>
    </Container>
  );
};

export default Header;
