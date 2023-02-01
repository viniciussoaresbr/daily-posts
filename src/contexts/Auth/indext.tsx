import React, { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../service/api';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import {
  UseFormClearErrors,
  UseFormReset,
  UseFormSetError,
} from 'react-hook-form';
import { SignUpInputs } from '../../pages/SignUp';
import { SignInInputs } from '../../pages/SignIn';

interface IUserLogin {
  email: string;
  password: string;
}

interface IUserRegister extends IUserLogin {
  name: string;
  lastname: string;
}

interface IAuthContext {
  handleLogin: (
    user: IUserLogin,
    reset: UseFormReset<SignInInputs>,
    setError: UseFormSetError<SignInInputs>,
    clearErrors: UseFormClearErrors<SignInInputs>,
  ) => void;
  handleLogout: () => void;
  authenticated: boolean;
  registerUser: (
    user: IUserRegister,
    reset: UseFormReset<SignUpInputs>,
    setError: UseFormSetError<SignUpInputs>,
    clearErrors: UseFormClearErrors<SignUpInputs>,
  ) => void;
}

export const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (
    user: IUserLogin,
    reset: UseFormReset<SignInInputs>,
    setError: UseFormSetError<SignInInputs>,
    clearErrors: UseFormClearErrors<SignInInputs>,
  ) => {
    try {
      const {
        data: { accessToken, userId },
      } = await api.post('/auth', user);
      localStorage.setItem('token', accessToken);
      localStorage.setItem('userId', userId);
      setAuthenticated(true);
      reset();
      clearErrors();
      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          setError('email', { type: 'custom' });
          setError('password', {
            type: 'custom',
            message: error.response?.data.message,
          });
        }
        toast.error(error.response?.data.message);
        setError('password', {
          type: 'custom',
          message: error.response?.data.message,
        });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setAuthenticated(false);
    navigate('/login');
  };

  const registerUser = async (
    user: IUserRegister,
    reset: UseFormReset<SignUpInputs>,
    setError: UseFormSetError<SignUpInputs>,
    clearErrors: UseFormClearErrors<SignUpInputs>,
  ) => {
    try {
      const { data } = await api.post('/users', user);
      toast.success(data.message);
      reset();
      clearErrors();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        setError('email', {
          type: 'custom',
          message: error.response?.data.message,
        });
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleLogout, authenticated, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
