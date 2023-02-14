import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';
import ProfileCard from '../ProfileCard';
import { Styled } from './styles';

const Header = () => {
  const authToken = localStorage.getItem('token');
  const { authenticated } = useContext(AuthContext);
  return (
    <Styled.Header>
      <Styled.HeaderTitle>Daily Posts</Styled.HeaderTitle>
      {(authToken || authenticated) && <ProfileCard />}
    </Styled.Header>
  );
};

export default Header;
