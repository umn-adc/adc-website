import React, { ButtonHTMLAttributes } from 'react';
import { Main } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <Main {...props}>{children}</Main>;
};

export default Button;
