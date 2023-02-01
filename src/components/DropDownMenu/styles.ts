import styled from 'styled-components';
import { ReactComponent as Exit } from '../../assets/logout-icon.svg';

interface IDropDownProps {
  showMenu: boolean;
}

const DropDownContainer = styled.div<IDropDownProps>`
  position: absolute;
  top: 4rem;
  right: 0;
  display: flex;
  align-items: center;
  width: 12rem;
  height: 3rem;
  background-color: #fe4a49;
  border-bottom-left-radius: 0.2rem;
  border-bottom: 1px solid #cb0101;
  border-left: 1px solid #cb0101;
  transform: ${({ showMenu }) =>
    showMenu ? 'translateY(0)' : 'translateY(-3rem)'};
  transition: all ease 0.3s;
  z-index: -1;
  cursor: pointer;
  @media (max-width: 425px) {
    width: 4rem;
  }
`;

const DropDownList = styled.div`
  font: 1rem 'Open Sans';
  color: #f4f4f8;
  margin-left: 0.3rem;
  list-style: none;
  @media (max-width: 425px) {
    display: none;
  }
`;

const LogoutIcon = styled(Exit)`
  width: 48px;
  fill: #f4f4f8;
`;

export const Styled = { DropDownContainer, DropDownList, LogoutIcon };
