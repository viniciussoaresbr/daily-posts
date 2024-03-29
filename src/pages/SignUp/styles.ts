import { FieldError, FieldErrors } from 'react-hook-form';
import styled from 'styled-components';
import { SignUpInputs } from '.';
import { ReactComponent as Eye } from '../../assets/eye-icon.svg';
import { ReactComponent as SlashedEye } from '../../assets/slashed-eye-icon.svg';

const SignUpContainer = styled.div<{ errors: FieldErrors<SignUpInputs> }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ errors }) =>
    errors.name ||
    errors.lastname ||
    errors.email ||
    errors.password ||
    errors.confirmPassword
      ? '10rem'
      : '6rem'};

  @media (min-width: 1440px) {
    justify-content: center;
    margin: 0;
  }
`;

const SignUpForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 35%;
  height: 47rem;
  background-color: #f4f4f8;
  border-radius: 1rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    width: 65%;
  }

  @media (max-width: 768px) {
    width: 75%;
  }

  @media (max-width: 425px) {
    width: 95%;
  }
`;

const SignUpTitle = styled.h1`
  font: 1.5rem 'Open Sans';
  color: #25252c;
  margin-top: 1rem;
`;

const SignUpLabel = styled.label`
  align-self: start;
  font: 1rem 'Open Sans';
  font-weight: 300;
  color: #25252c;
  margin: 1rem 10%;
`;

const SignUpPassordContainer = styled.div`
  position: relative;
  width: 80%;
  height: 3rem;
`;

const EyeShowPassword = styled(Eye)`
  position: absolute;
  top: 13px;
  right: 5px;
  width: 25px;
  fill: #25252c;
  cursor: pointer;
`;
const EyeHidePassword = styled(SlashedEye)`
  position: absolute;
  top: 13px;
  right: 4px;
  width: 27px;
  fill: #25252c;
  cursor: pointer;
`;

interface InputProps {
  h?: string;
  errors?: FieldError;
}

const SignUpInput = styled.input<InputProps>`
  width: ${({ h }) => (h ? h : '80%')};
  height: 3rem;
  outline: none;
  background-color: #e6e6ea;
  border-radius: 0.3rem;
  border: ${({ errors }) =>
    errors ? '1px solid #fe2020' : '1px solid #c7c7d1'};
  padding: 0 0.3rem;
  font: 1rem 'Open Sans';
  font-weight: 300;
  transition: ease 0.1s;
  :focus {
    border: ${({ errors }) =>
      errors ? '1px solid #fe2020' : '1px solid #25252c'};
  }
`;

const SignUpErrors = styled.span`
  font: 13px 'Open Sans';
  color: #fe2020;
`;

const SignUpButton = styled.button`
  width: 80%;
  height: 3rem;
  background-color: #fe4a49;
  font: 1rem 'Open Sans';
  font-weight: 300;
  border-radius: 0.3rem;
  margin: 1rem 0;
  color: #f4f4f8;
  transition: ease 0.2s;
  cursor: pointer;
  :hover {
    background-color: #fe2020;
  }
`;

const NavSignUpContainer = styled.nav`
  width: 80%;
  height: 2rem;
  display: flex;
  justify-content: center;
`;

const SignUpAdvice = styled.p`
  font: 1rem 'Open Sans';
  font-weight: 300;
  color: #25252c;
`;

const SignUpLink = styled.a`
  font: 1rem 'Open Sans';
  color: #25252c;
  margin-left: 0.5rem;
  cursor: pointer;
  :hover {
    border-bottom: 1px solid #25252c;
  }
`;

export const Styled = {
  SignUpForm,
  SignUpContainer,
  SignUpTitle,
  SignUpInput,
  SignUpLabel,
  SignUpButton,
  SignUpAdvice,
  NavSignUpContainer,
  SignUpLink,
  SignUpPassordContainer,
  EyeShowPassword,
  EyeHidePassword,
  SignUpErrors,
};
