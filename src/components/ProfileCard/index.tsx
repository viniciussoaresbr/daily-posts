import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/User';
import DropDownMenu from '../DropDownMenu';
import { Styled } from './styles';

const ProfileCard = () => {
  const { username, getUserById } = useContext(UserContext);

  useEffect(() => {
    getUserById();
  }, []);

  const [showMenu, setShowMenu] = useState(false);
  return (
    <React.Fragment>
      <Styled.ProfileCard onClick={() => setShowMenu(!showMenu)}>
        <Styled.UserProfile />
        <Styled.Username>{username}</Styled.Username>
      </Styled.ProfileCard>
      <DropDownMenu
        showMenu={showMenu}
        onClickOutside={() => setShowMenu(false)}
      />
    </React.Fragment>
  );
};

export default ProfileCard;
