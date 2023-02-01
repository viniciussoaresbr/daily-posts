import React, { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth/indext';
import { Styled } from './styles';

export type SignInInputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignInInputs>();
  const onSubmit: SubmitHandler<SignInInputs> = data =>
    handleLogin(data, reset, setError, clearErrors);

  return (
    <Styled.SignInContainer>
      <Styled.SignInForm onSubmit={handleSubmit(onSubmit)}>
        <Styled.SignInTitle>Login</Styled.SignInTitle>
        <Styled.SignInLabel>E-mail:</Styled.SignInLabel>
        <Styled.SignInInput
          errors={errors.email}
          type="text"
          placeholder="Digite seu e-mail"
          {...register('email', {
            required: {
              value: true,
              message: 'O campo de e-mail não pode estar vazio',
            },
          })}
          name="email"
        />
        <Styled.SignInErrors>{errors.email?.message}</Styled.SignInErrors>
        <Styled.SignInLabel>Senha:</Styled.SignInLabel>
        <Styled.SignInPassordContainer>
          <Styled.SignInInput
            errors={errors.password}
            type={showPassword ? 'text' : 'password'}
            placeholder="Digite sua senha"
            h="100%"
            {...register('password', {
              required: {
                value: true,
                message: 'O campo de senha não pode estar vazio',
              },
            })}
            name="password"
          />
          {!showPassword ? (
            <Styled.EyeHidePassword onClick={() => setShowPassword(true)} />
          ) : (
            <Styled.EyeShowPassword onClick={() => setShowPassword(false)} />
          )}
        </Styled.SignInPassordContainer>
        <Styled.SignInErrors>{errors.password?.message}</Styled.SignInErrors>
        <Styled.SignInButton type="submit">Login</Styled.SignInButton>
        <Styled.NavSignInContainer>
          <Styled.SignInAdvice>
            Não tem cadastro ?
            <Styled.SignInLink onClick={() => navigate('/signup')}>
              Cadastre-se
            </Styled.SignInLink>
          </Styled.SignInAdvice>
        </Styled.NavSignInContainer>
      </Styled.SignInForm>
    </Styled.SignInContainer>
  );
};

export default SignIn;
