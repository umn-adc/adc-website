import Victor from 'assets/images/victor.png';
import Gideon from 'assets/images/gideon.jpg';
import Liem from 'assets/images/liem.jpg';
import Johnny from 'assets/images/johnny.jpg';
import Dhruv from 'assets/images/dhruv.jpg';
import Shreya from 'assets/images/shreya.jpg';
import Akanksha from 'assets/images/akanksha.jpg';
import Lennon from 'assets/images/lennon.jpg';

export interface OfficerProfile {
  name: string;
  position: string;
  picture: string;
  message?: string;
}

const board = [
  {
    name: 'Gideon',
    position: 'President',
    picture: Gideon,
    message: 'I am very tall',
  },
  {
    name: 'Liem',
    position: 'Vice-President',
    picture: Liem,
    message: 'Donowall enthusiast',
  },
  {
    name: 'Victor',
    position: 'Tech Lead',
    picture: Victor,
    message: 'I made this! 😎',
  }, // 🤫🧏‍♂️
  {
    name: 'Lennon',
    position: 'Marketing Director',
    picture: Lennon,
    message: 'The 𝘥𝘦𝘴𝘪𝘨𝘯 🐐',
  },
  {
    name: 'Johnny',
    position: 'Event Coordinator',
    picture: Johnny,
    message:
      '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0, \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0?           \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0\u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0\u00A0\u00A0\u00A0\u00A0!!',
  },
  {
    name: 'Akanksha',
    position: 'Event Coordinator',
    picture: Akanksha,
    message: 'What Johnny said',
  },
  {
    name: 'Shreya',
    position: 'Treasurer',
    picture: Shreya,
    message: 'Slaya',
  },
  {
    name: 'Dhruv',
    position: 'Workshop Instructor',
    picture: Dhruv,
    message: 'Assassins Creed enjoyer idk',
  },
];

export default board;
