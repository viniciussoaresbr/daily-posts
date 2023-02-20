import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth';
import { ROUTES } from '../../routes/routes';
import ProfileCard from '../ProfileCard';
import { Styled } from './styles';

const Header = () => {
  const authToken = localStorage.getItem('token');
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const redirectToPage = () => (authToken ? ROUTES.HOME : ROUTES.LOGIN);

  return (
    <Styled.Header>
      <Styled.HeaderTitle onClick={() => navigate(redirectToPage())}>
        Daily Posts
      </Styled.HeaderTitle>
      {(authToken || authenticated) && <ProfileCard />}
    </Styled.Header>
  );
};

export default Header;
