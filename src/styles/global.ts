import { createGlobalStyle, keyframes } from 'styled-components';
import fontsCSS from './fonts';

export const fadeInUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const moveRight = keyframes`
  from {
    transform: translateX(-20px);
  }
  to {
    transform: translateX(0);
  }
`;

export const moveUp = keyframes`
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
`;
export const moveDown = keyframes`
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
`;

export const moveLeft = keyframes`
  from {
    transform: translateX(20px);
  }
  to {
    transform: translateX(0);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const zoomOut = keyframes`
  from {
    transform: scale(1.15);
  } to {
    transform: scale(1.0);
  }
`;

const GlobalStyle = createGlobalStyle`

:root {
  --custom-ease: cubic-bezier(.07,.88,.62,.99);
}

${fontsCSS}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: NotoSans;
}
`;

export default GlobalStyle;
