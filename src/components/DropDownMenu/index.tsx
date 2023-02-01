import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth/indext';
import { Styled } from './styles';

interface IDropDownMenuProps {
  showMenu: boolean;
}

const DropDownMenu = ({ showMenu }: IDropDownMenuProps) => {
  const { handleLogout } = useContext(AuthContext);
  return (
    <Styled.DropDownContainer showMenu={showMenu}>
      <Styled.LogoutIcon />
      <Styled.DropDownList onClick={handleLogout}>Sair</Styled.DropDownList>
    </Styled.DropDownContainer>
  );
};

export default DropDownMenu;
