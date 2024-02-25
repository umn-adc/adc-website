import React from 'react';
import Logo from 'assets/images/ADC_Logo_White.png';
import Button from 'components/Button';
import { ButtonsContainer, Container } from './styles';

const Hero: React.FC = () => {
  return (
    <Container>
      <img src={Logo} alt="App Developers Club logo" />
      <ButtonsContainer>
        <Button onClick={() => window.open('https://z.umn.edu/adcmailing')}>
          Subscribe to our mailing list
        </Button>
        <Button onClick={() => window.open('https://www.discord.gg/XCqJEbv')}>
          Join our Discord
        </Button>
        <Button
          onClick={() => {
            window.location.href = '#board';
          }}
        >
          Get to know the board
        </Button>
        <Button>Upcoming Events</Button>
        <Button
          onClick={() => {
            window.location.href =
              'https://calendar.google.com/calendar/embed?src=c_2db26583435c61feb261996d54d1387b033292ba48772526239aa12dd711766e%40group.calendar.google.com&ctz=America%2FChicago';
          }}
        >
          Google Calendar
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default Hero;
