import React, { useState } from 'react';
import DropDownMenu from '../DropDownMenu';
import { Styled } from './styles';

const ProfileCard = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <React.Fragment>
      <Styled.ProfileCard onClick={() => setShowMenu(!showMenu)}>
        <Styled.UserProfile />
        <Styled.Username>Vinicius Soares</Styled.Username>
      </Styled.ProfileCard>
      <DropDownMenu showMenu={showMenu} />
    </React.Fragment>
  );
};

export default ProfileCard;
