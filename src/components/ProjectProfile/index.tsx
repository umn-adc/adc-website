import React, { HTMLProps } from 'react';
import { Container, Icon } from './styles';

interface ProjectProfileProps extends HTMLProps<HTMLAnchorElement> {
  icon: string;
  title: string;
  link: string;
}

const ProjectProfile: React.FC<ProjectProfileProps> = ({
  icon,
  title,
  link,
  ...props
}) => {
  return (
    <Container href={link} {...props}>
      <Icon>
        <img src={icon} alt="" />
      </Icon>
      <h3>{title}</h3>
    </Container>
  );
};

export default ProjectProfile;
