import styled from 'styled-components';
import { ReactComponent as User } from '../../assets/user-icon.svg';

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 100%;
`;

const PostForm = styled.form`
  width: 100%;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const PostInput = styled.input`
  width: 100%;
  height: 3rem;
  outline: none;
  background-color: #f4f4f8;
  padding: 0 0.5rem;
  border-radius: 0.3rem;
  border: 1px solid #c7c7d1;
  padding: 0 0.3rem;
  font: 1rem 'Open Sans';
  font-weight: 300;
  transition: ease 0.1s;
  :focus {
    border: 1px solid #25252c;
  }
  ::placeholder {
    text-align: center;
  }
  ::-ms-input-placeholder {
    text-align: center;
  }
`;

const PostButton = styled.button`
  width: 100%;
  height: 3rem;
  font: 1.2rem 'Open Sans';
  color: #f4f4f8;
  background-color: #fe4a49;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: ease 0.2s;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  transform: scale(1);
  :hover {
    transform: scale(0.98);
  }
`;

const NavPostContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 75%;
  border-radius: 0.2rem;
  background-color: #f4f4f8;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  padding-bottom: 1rem;
`;

const NavSwitchContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 100%;
  height: 4rem;
`;

interface ISwitchProps {
  switchPosts: string;
}

const NavPostsSwitch = styled.h1<ISwitchProps>`
  font: 1.2rem 'Open Sans';
  color: #fe4a49;
  transition: ease 0.2s;
  cursor: pointer;
  border-bottom: ${({ switchPosts }) =>
    switchPosts === 'allPosts' ? '1px solid #fe4a49;' : ''};
  :hover {
    border-bottom: 1px solid #fe4a49;
  }
`;

const NavMyPostsSwitch = styled.h1<ISwitchProps>`
  font: 1.2rem 'Open Sans';
  color: #fe4a49;
  transition: ease 0.2s;
  cursor: pointer;
  border-bottom: ${({ switchPosts }) =>
    switchPosts === 'myPosts' ? '1px solid #fe4a49;' : ''};
  :hover {
    border-bottom: 1px solid #fe4a49;
  }
`;

const PostAreaContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 4rem);
  gap: 10px;
  padding: 3px;
`;

const PostCard = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 95%;
  height: 65px;
  border-radius: 0.2rem;
  padding: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 1px,
    rgba(0, 0, 0, 0.13) 0px 0px 1px 1px;
`;

const PostAuthorContainer = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.5rem;
`;

const AuthorTitle = styled.h1`
  font: 1rem 'Open Sans';
  color: #25252c;
  margin-left: 0.3rem;
`;

const PostText = styled.p`
  font: 0.8rem 'Open Sans';
  color: #25252c;
  margin-left: 0.3rem;
`;

const UserProfilePic = styled(User)`
  width: 30px;
  fill: #25252c;
`;

export const Styled = {
  MainContainer,
  NavPostContainer,
  NavSwitchContainer,
  NavPostsSwitch,
  NavMyPostsSwitch,
  PostForm,
  PostInput,
  PostButton,
  PostCard,
  AuthorTitle,
  PostText,
  UserProfilePic,
  PostAuthorContainer,
  PostAreaContainer,
};
