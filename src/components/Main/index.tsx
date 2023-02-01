import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IPost, PostContext } from '../../contexts/Post';
import { Styled } from './styles';

const Main = () => {
  const { getPosts, savePost, getPostById, allPosts, myPosts } =
    useContext(PostContext);
  const [switchPosts, setSwitchPosts] = useState('allPosts');

  useEffect(() => {
    getPosts();
    getPostById();
  }, []);

  const { register, handleSubmit, reset } = useForm<IPost>();
  const onSubmit: SubmitHandler<IPost> = data => {
    savePost(data, reset);
  };

  return (
    <Styled.MainContainer>
      <Styled.PostForm onSubmit={handleSubmit(onSubmit)}>
        <Styled.PostInput
          type="text"
          {...register('text', { required: true })}
          name="text"
          placeholder="O que você está pensando ?"
        />
        <Styled.PostButton type="submit">Postar</Styled.PostButton>
      </Styled.PostForm>
      <Styled.NavPostContainer>
        <Styled.NavSwitchContainer>
          <Styled.NavMyPostsSwitch
            switchPosts={switchPosts}
            onClick={() => setSwitchPosts('myPosts')}
          >
            Meus Posts
          </Styled.NavMyPostsSwitch>
          <Styled.NavPostsSwitch
            switchPosts={switchPosts}
            onClick={() => setSwitchPosts('allPosts')}
          >
            Todos os Posts
          </Styled.NavPostsSwitch>
        </Styled.NavSwitchContainer>
        <Styled.PostAreaContainer>
          {switchPosts === 'allPosts'
            ? allPosts.map(({ text, username }, index) => {
                return (
                  <Styled.PostCard key={index}>
                    <Styled.PostAuthorContainer>
                      <Styled.UserProfilePic />
                      <Styled.AuthorTitle>{username}</Styled.AuthorTitle>
                    </Styled.PostAuthorContainer>
                    <Styled.PostText>{text}</Styled.PostText>
                  </Styled.PostCard>
                );
              })
            : myPosts.map(({ text, username }, index) => {
                return (
                  <Styled.PostCard key={index}>
                    <Styled.PostAuthorContainer>
                      <Styled.UserProfilePic />
                      <Styled.AuthorTitle>{username}</Styled.AuthorTitle>
                    </Styled.PostAuthorContainer>
                    <Styled.PostText>{text}</Styled.PostText>
                  </Styled.PostCard>
                );
              })}
        </Styled.PostAreaContainer>
      </Styled.NavPostContainer>
    </Styled.MainContainer>
  );
};

export default Main;
