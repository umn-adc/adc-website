import Victor from 'assets/images/victor.jpg';
import Gideon from 'assets/images/gideon.jpg';
import Liem from 'assets/images/liem.jpg';
import Johnny from 'assets/images/johnny.jpg';
import Akshat from 'assets/images/akshat.jpg';
import Daniel from 'assets/images/daniel.jpg';
import Helen from 'assets/images/helen.jpg';
import Lennon from 'assets/images/lennon.jpg';

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
    name: 'Liem',
    position: 'Treasurer',
    picture: Liem,
    message: 'Least toxic TFT player',
  },
  {
    name: 'Gideon',
    position: 'Advisor',
    picture: Gideon,
    message: 'I am very tall',
  },
  {
    name: 'Lennon',
    position: 'Marketing Director',
    picture: Lennon,
    message: 'Someone once told me',
  },
  {
    name: 'Johnny',
    position: 'Event Coordinator',
    picture: Johnny,
    message: 'winton',
  },
  {
    name: 'Helen',
    position: 'External Relations',
    picture: Helen,
    message: 'The best way to predict the future is to create it',
  },
  {
    name: 'Daniel',
    position: 'Secretary',
    picture: Daniel,
    message: 'I like big ducks and I cannot lie',
  },
  {
    name: 'Akshat',
    position: 'Co-Treasurer',
    picture: Akshat,
    message: '???????',
  },
];

export default board;
