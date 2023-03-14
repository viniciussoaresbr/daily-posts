import React from 'react';
import { AxiosError } from 'axios';
import { createContext, ReactNode, useState } from 'react';
import {
  UseFormClearErrors,
  UseFormReset,
  UseFormSetError,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { SignUpInputs } from '../../pages/SignUp';
import { api } from '../../service/api';

export interface IUserLogin {
  email: string;
  password: string;
}

interface IUserRegister extends IUserLogin {
  name: string;
  lastname: string;
}

interface IUserContext {
  registerUser: (
    user: IUserRegister,
    reset: UseFormReset<SignUpInputs>,
    setError: UseFormSetError<SignUpInputs>,
    clearErrors: UseFormClearErrors<SignUpInputs>,
  ) => void;
  getUserById: () => void;
  username: string;
}

export const UserContext = createContext({} as IUserContext);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('');
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

  const getUserById = async () => {
    const authToken = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    try {
      const {
        data: { name, lastname },
      } = await api.get(`/users/${userId}`, {
        headers: {
          Authorization: 'Bearer ' + authToken,
        },
      });
      setUsername(`${name} ${lastname}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <UserContext.Provider value={{ registerUser, getUserById, username }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
