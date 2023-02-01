import styled from 'styled-components';
import { ReactComponent as User } from '../../assets/user-icon.svg';

const ProfileCard = styled.section`
  display: flex;
  align-items: center;
  width: 12rem;
  height: 80%;
  cursor: pointer;
  @media (max-width: 425px) {
    width: 4rem;
  }
`;

const Username = styled.h1`
  font: 1rem 'Open Sans';
  color: #f4f4f8;
  margin-left: 0.4rem;
  @media (max-width: 425px) {
    display: none;
  }
`;

const UserProfile = styled(User)`
  width: 48px;
  fill: #f4f4f8;
`;

export const Styled = { ProfileCard, Username, UserProfile };
