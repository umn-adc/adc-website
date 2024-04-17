import { css } from 'styled-components';
import NotoSans from 'assets/fonts/NotoSans-Variable.ttf';
import NotoSansItalic from 'assets/fonts/NotoSansItalic-Variable.ttf';
import NotoSansMono from 'assets/fonts/NotoSansMono-Variable.ttf';
import BungeeRegular from 'assets/fonts/Bungee-Regular.ttf';

const fontsCSS = css`
  @font-face {
    font-family: NotoSans;
    src: url(${NotoSans});
    font-style: normal;
  }
  @font-face {
    font-family: NotoSans;
    src: url(${NotoSansItalic});
    font-style: italic;
  }
  @font-face {
    font-family: NotoSansMono;
    src: url(${NotoSansMono});
  }
  @font-face {
    font-family: Bungee;
    src: url(${BungeeRegular});
  }
`;

export default fontsCSS;
