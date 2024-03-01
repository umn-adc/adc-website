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
    transform: translateY(-20px);
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

// burger menu
/* Position and sizing of burger button */
.bm-burger-button {
  position: fixed;
  width: 22px;
  height: 16px;
  left: 30px;
  top: 19.5px;

  @media (min-width: 1025px) {
    display: none;
  }
}

/* Color/shape of burger icon bars */
.bm-burger-bars {
  background: ${({ theme }) => theme.colors.secondaryDarker};
  height: 2px !important;
  border-radius: 10px;
  transition: transform 300ms var(--custom-ease) !important;
}

/* Color/shape of burger icon bars on hover*/
.bm-burger-bars-hover {
  transform: scale(1.05);
  opacity: 1 !important;
  background: ${({ theme }) => theme.colors.secondaryDarker};
}

/* Position and sizing of clickable cross button */
.bm-cross-button {
  height: 24px;
  width: 24px;
}

/* Color/shape of close button cross */
.bm-cross {
  background: #bdc3c7;
}

/*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
.bm-menu-wrap {
  position: fixed;
  height: 100%;
}

/* General sidebar styles */
.bm-menu {
  background: ${({ theme }) => theme.colors.primary};
  padding: 2.5em 0.5em 0;
  font-size: 1.15em;
}

/* Morph shape necessary with bubble or elastic */
.bm-morph-shape {
  fill: ${({ theme }) => theme.colors.primary};
}

/* Wrapper for item list */
.bm-item-list {
  color: #b8b7ad;
  padding: 0.8em;
}

/* Individual item */
.bm-item {
  display: inline-block;
}

/* Styling of overlay */
.bm-overlay {
  background: rgba(0, 0, 0, 0.2);
}
`;

export default GlobalStyle;
