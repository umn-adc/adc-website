import React from 'react';
import Logo from 'assets/images/ADC_Logo_White.png';
import Button from 'components/Button';
import { scroller } from 'react-scroll';
import { ButtonsContainer, Container } from './styles';

const Hero: React.FC = () => {
  return (
    <Container>
      <img src={Logo} alt="App Developers Club logo" />
      <ButtonsContainer>
        <Button
          onClick={() => {
            window.open('https://z.umn.edu/adcmailing', '_blank')?.focus();
          }}
        >
          Subscribe to our mailing list
        </Button>
        <Button
          onClick={() => {
            window.open('https://www.discord.gg/XCqJEbv', '_blank')?.focus();
          }}
        >
          Join our Discord
        </Button>
        <Button
          onClick={() => {
            scroller.scrollTo('boardSection', {
              duration: 1000,
              smooth: true,
              delay: 0,
            });
          }}
        >
          Get to know the board
        </Button>
        <Button
          onClick={() =>
            window
              .open(
                'https://twincitiesumn.campusgroups.com/events?group_ids=35824&event_type=undefined',
                '_blank'
              )
              ?.focus()
          }
        >
          Upcoming Events
        </Button>
        <Button
          onClick={() => {
            window
              .open(
                'https://calendar.google.com/calendar/embed?src=c_2db26583435c61feb261996d54d1387b033292ba48772526239aa12dd711766e%40group.calendar.google.com&ctz=America%2FChicago',
                '_blank'
              )
              ?.focus();
          }}
        >
          Google Calendar
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default Hero;
