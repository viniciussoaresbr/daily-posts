import React, { createContext, ReactNode, useState } from 'react';
import { api } from '../../service/api';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { UseFormReset } from 'react-hook-form';

export interface IPost {
  text: string;
}

interface IPostData extends IPost {
  id: number;
  authorId: number;
  username: string;
}

interface IPostContext {
  getPosts: () => void;
  allPosts: IPostData[];
  myPosts: IPostData[];
  savePost: (data: IPost, reset: UseFormReset<IPost>) => void;
  getPostById: () => void;
}

export const PostContext = createContext({} as IPostContext);

const PostProvider = ({ children }: { children: ReactNode }) => {
  const [allPosts, setAllPosts] = useState<IPostData[]>([]);
  const [myPosts, setMyPosts] = useState<IPostData[]>([]);

  const getPosts = async () => {
    const authToken = localStorage.getItem('token');
    try {
      const { data } = await api.get('/posts', {
        headers: {
          Authorization: 'Bearer ' + authToken,
        },
      });
      setAllPosts(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const getPostById = async () => {
    const authToken = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    try {
      const { data } = await api.get(`/posts/users/${userId}`, {
        headers: {
          Authorization: 'Bearer ' + authToken,
        },
      });
      setMyPosts(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const savePost = async (dataPost: IPost, reset: UseFormReset<IPost>) => {
    const authToken = localStorage.getItem('token');
    try {
      const { data } = await api.post('/posts', dataPost, {
        headers: {
          Authorization: 'Bearer ' + authToken,
        },
      });
      toast.success(data.message);
      reset();
      getPosts();
      getPostById();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };
  return (
    <PostContext.Provider
      value={{ getPosts, allPosts, myPosts, savePost, getPostById }}
    >
      {children}
    </PostContext.Provider>
  );
};
export default PostProvider;
