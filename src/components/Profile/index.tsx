import React, { HTMLProps } from 'react';
import { Container, Picture } from './styles';

interface ProfileProps extends HTMLProps<HTMLDivElement> {
  name: string;
  position: string;
  picture: string;
  message?: string;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  position,
  picture,
  message,
  ...props
}) => {
  return (
    <Container message={message} {...props}>
      <Picture src={picture} alt={`${name}'s picture`} />
      <h2>{name}</h2>
      <h3>{position}</h3>
    </Container>
  );
};

Profile.defaultProps = {
  message: undefined,
};

export default Profile;
