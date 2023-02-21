import React, { useState, useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import { ROUTES } from '../../routes/routes';
import { Styled } from './styles';

export type SignUpInputs = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const SignUp = () => {
  const { registerUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
    getValues,
  } = useForm<SignUpInputs>();
  const onSubmit: SubmitHandler<SignUpInputs> = data => {
    delete data.confirmPassword;
    registerUser(data, reset, setError, clearErrors);
  };

  const validatingEmail = (value: string) => {
    const isEmailValid =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        value,
      );
    const emailInvalidError = 'E-mail digitado não existe ou é inválido';
    return isEmailValid || emailInvalidError;
  };

  const validatingPassword = (value: string) => {
    const haveUpperCase = /[A-Z]/.test(value);
    const haveLowerCase = /[a-z]/.test(value);
    const haveNumber = /[0-9]/.test(value);

    const isPasswordValid = haveUpperCase && haveLowerCase && haveNumber;
    const passwordInvalidError = `A senha deve conter ${
      !haveUpperCase
        ? 'letra maiúscula'
        : !haveLowerCase
        ? 'letra minúscula'
        : !haveNumber && 'um número'
    }`;
    return isPasswordValid || passwordInvalidError;
  };

  const confirmingPassword = (value?: string) => {
    const password = getValues('password');
    const passwordConfirmed = password === value;
    const passwordNotConfirmedError =
      'Senha diferente da senha digitada anteriormente';

    return passwordConfirmed || passwordNotConfirmedError;
  };

  return (
    <Styled.SignUpContainer errors={errors}>
      <Styled.SignUpForm onSubmit={handleSubmit(onSubmit)}>
        <Styled.SignUpTitle>Criar Conta</Styled.SignUpTitle>
        <Styled.SignUpLabel>Nome:</Styled.SignUpLabel>
        <Styled.SignUpInput
          errors={errors.name}
          type="text"
          placeholder="Digite seu nome"
          {...register('name', {
            required: {
              value: true,
              message: 'O campo de nome não pode estar vazio',
            },
          })}
          name="name"
        />
        <Styled.SignUpErrors>{errors.name?.message}</Styled.SignUpErrors>
        <Styled.SignUpLabel>Sobrenome:</Styled.SignUpLabel>
        <Styled.SignUpInput
          errors={errors.lastname}
          type="text"
          placeholder="Digite seu sobrenome"
          {...register('lastname', {
            required: {
              value: true,
              message: 'O campo de sobrenome não pode estar vazio',
            },
          })}
          name="lastname"
        />
        <Styled.SignUpErrors>{errors.lastname?.message}</Styled.SignUpErrors>
        <Styled.SignUpLabel>E-mail:</Styled.SignUpLabel>
        <Styled.SignUpInput
          errors={errors.email}
          type="text"
          placeholder="Digite seu e-mail"
          {...register('email', {
            required: {
              value: true,
              message: 'O campo de e-mail não pode estar vazio',
            },
            validate: validatingEmail,
          })}
          name="email"
        />
        <Styled.SignUpErrors>{errors.email?.message}</Styled.SignUpErrors>
        <Styled.SignUpLabel>Digite sua senha:</Styled.SignUpLabel>
        <Styled.SignUpPassordContainer>
          <Styled.SignUpInput
            errors={errors.password}
            type={showPassword ? 'text' : 'password'}
            placeholder="Digite sua senha"
            h="100%"
            {...register('password', {
              required: {
                value: true,
                message: 'O campo de senha não pode estar vazio',
              },
              minLength: {
                value: 8,
                message: 'A senha deve conter pelo menos 8 caracteres',
              },
              maxLength: {
                value: 18,
                message: 'A senha deve conter no máximo 18 caracteres',
              },
              validate: validatingPassword,
            })}
            name="password"
          />
          {!showPassword ? (
            <Styled.EyeHidePassword onClick={() => setShowPassword(true)} />
          ) : (
            <Styled.EyeShowPassword onClick={() => setShowPassword(false)} />
          )}
        </Styled.SignUpPassordContainer>
        <Styled.SignUpErrors>{errors.password?.message}</Styled.SignUpErrors>
        <Styled.SignUpLabel>Confirme sua senha:</Styled.SignUpLabel>
        <Styled.SignUpPassordContainer>
          <Styled.SignUpInput
            errors={errors.confirmPassword}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirme sua senha"
            h="100%"
            {...register('confirmPassword', {
              required: {
                value: true,
                message: 'O campo de confirmar senha não pode estar vazio',
              },
              validate: confirmingPassword,
            })}
            name="confirmPassword"
          />
          {!showConfirmPassword ? (
            <Styled.EyeHidePassword
              onClick={() => setShowConfirmPassword(true)}
            />
          ) : (
            <Styled.EyeShowPassword
              onClick={() => setShowConfirmPassword(false)}
            />
          )}
        </Styled.SignUpPassordContainer>
        <Styled.SignUpErrors>
          {errors.confirmPassword?.message}
        </Styled.SignUpErrors>
        <Styled.SignUpButton type="submit">Cadastrar</Styled.SignUpButton>
        <Styled.NavSignUpContainer>
          <Styled.SignUpAdvice>
            Já tem cadastro ?
            <Styled.SignUpLink onClick={() => navigate(ROUTES.LOGIN)}>
              Entrar
            </Styled.SignUpLink>
          </Styled.SignUpAdvice>
        </Styled.NavSignUpContainer>
      </Styled.SignUpForm>
    </Styled.SignUpContainer>
  );
};

export default SignUp;
