import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../contexts/Auth';
import { Styled } from './styles';

interface IDropDownMenuProps {
  showMenu: boolean;
  onClickOutside: () => void;
}

const DropDownMenu = ({ showMenu, onClickOutside }: IDropDownMenuProps) => {
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        onClickOutside();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [componentRef]);

  const { handleLogout } = useContext(AuthContext);
  return (
    <Styled.DropDownContainer
      showMenu={showMenu}
      ref={componentRef}
      onClick={handleLogout}
    >
      <Styled.LogoutIcon />
      <Styled.DropDownList>Sair</Styled.DropDownList>
    </Styled.DropDownContainer>
  );
};

export default DropDownMenu;
