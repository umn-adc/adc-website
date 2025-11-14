import Victor from 'assets/images/victor.jpg';
import Johnny from 'assets/images/johnny.jpg';
import Qise from 'assets/images/qise.jpg';
import Kieran from 'assets/images/kieran.jpg';
import Alex from 'assets/images/alex.jpg';
import Agness from 'assets/images/agness.jpg';

export interface OfficerProfile {
  name: string;
  position: string;
  picture: string;
  message?: string;
}

const board = [
  {
    name: 'Victor',
    position: 'President',
    picture: Victor,
    message: 'I made this! 😎',
  }, // 🤫🧏‍♂️
  {
    name: 'Alex',
    position: 'Vice President',
    picture: Alex,
    message: 'This is alex',
  },
  {
    name: 'Qise',
    position: 'Secretary',
    picture: Qise,
    message: '😹',
  },
  {
    name: 'Johnny',
    position: 'Treasurer',
    picture: Johnny,
    message: 'winton',
  },
  {
    name: 'Kieran',
    position: 'Officer',
    picture: Kieran,
    message: '🙆',
  },
  {
    name: 'Agness',
    position: 'Marketing Lead',
    picture: Agness,
    message: 'Tmr is another day',
  },
];

export default board;
