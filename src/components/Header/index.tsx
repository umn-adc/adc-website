import React from 'react';
import ADCLogo from 'assets/images/ADC_Logo_Blue.png';
import { FaGithub } from 'react-icons/fa';
import { scroller } from 'react-scroll';
import { Container, HeaderLink, HomeLink, Menu } from './styles';

const Header = () => {
  return (
    <Container>
      <HomeLink href="/">
        <img src={ADCLogo} alt="ADC logo" />
      </HomeLink>
      <Menu>
        <HeaderLink
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Home
        </HeaderLink>
        <HeaderLink
          onClick={() => {
            window.location.href = '/challenges';
          }}
        >
          Challenges
        </HeaderLink>
        <HeaderLink
          onClick={() => {
            scroller.scrollTo('boardSection', {
              duration: 1000,
              smooth: true,
              delay: 0,
            });
          }}
        >
          Officers
        </HeaderLink>
        <HeaderLink
          onClick={() => {
            window
              .open(
                'https://twincitiesumn.campusgroups.com/events?group_ids=35824&event_type=undefined',
                '_blank'
              )
              ?.focus();
          }}
        >
          Events
        </HeaderLink>
        <HeaderLink
          style={{ borderRadius: '50%' }}
          onClick={() => {
            window.open('https://github.com/umn-adc', '_blank')?.focus();
          }}
        >
          <FaGithub />
        </HeaderLink>
      </Menu>
    </Container>
  );
};

export default Header;
