import React, { HTMLProps } from 'react';
import { Container } from './styles';

interface TabButtonProps extends HTMLProps<HTMLButtonElement> {
  children?: React.ReactNode;
}

// ? disabling on purpose to avoid proptype conflicts with `type`
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TabButton: React.FC<TabButtonProps> = ({ children, type, ...props }) => {
  return (
    <Container {...props} type="button">
      {children}
    </Container>
  );
};

TabButton.defaultProps = {
  children: undefined,
};

export default TabButton;
