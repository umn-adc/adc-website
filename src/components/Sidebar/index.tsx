import React from 'react';
import { HeaderLink } from 'components/Header/styles';
import { FaGithub } from 'react-icons/fa';
import ADCLogo from 'assets/images/ADC_Logo_Blue.png';
import { scroller } from 'react-scroll';
import { StyledMenu } from './styles';

interface SidebarProps extends React.ComponentProps<typeof StyledMenu> {}

const Sidebar: React.FC<SidebarProps> = ({ ...props }) => {
  return (
    <StyledMenu width={200} {...props}>
      <img
        src={ADCLogo}
        alt="ADC Logo"
        style={{ position: 'absolute', top: 15, left: 20, width: 50 }}
      />
      <HeaderLink
        className="menu-item"
        style={{ borderRadius: '50%' }}
        onClick={() => {
          window.open('https://github.com/umn-adc', '_blank')?.focus();
        }}
      >
        <FaGithub />
      </HeaderLink>
      <HeaderLink
        onClick={() => {
          window.location.href = '/';
        }}
      >
        Home
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
    </StyledMenu>
  );
};

export default Sidebar;
