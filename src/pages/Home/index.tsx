import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ModalConfirm from '../../components/ModalConfirm';
import { IPost, PostContext } from '../../contexts/Post';
import { Styled } from './styles';

const Home = () => {
  const { getPosts, savePost, getPostById, deletePost, allPosts, myPosts } =
    useContext(PostContext);
  const [switchPosts, setSwitchPosts] = useState('allPosts');
  const userId = localStorage.getItem('userId');
  const [postIdToDelete, setPostIdToDelete] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getPosts();
    getPostById();
  }, []);

  const { register, handleSubmit, reset } = useForm<IPost>();
  const onSubmit: SubmitHandler<IPost> = data => {
    savePost(data, reset);
  };

  const handleDeletePost = (id: number) => {
    setPostIdToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (postIdToDelete) {
      deletePost(postIdToDelete);
      setPostIdToDelete(null);
      setShowModal(false);
    }
  };

  return (
    <Styled.HomeContainer>
      <Styled.PostWrapper>
        <Styled.PostForm onSubmit={handleSubmit(onSubmit)}>
          <Styled.PostInput
            type="text"
            {...register('text', { required: true })}
            name="text"
            placeholder="O que você está pensando ?"
            maxLength={400}
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
              ? allPosts.map(({ id, text, username, authorId }, index) => {
                  return (
                    <Styled.PostCard key={index}>
                      <Styled.PostAuthorContainer>
                        <Styled.UserProfilePic />
                        <Styled.AuthorTitle>{username}</Styled.AuthorTitle>
                      </Styled.PostAuthorContainer>
                      <Styled.PostText>{text}</Styled.PostText>
                      {authorId === Number(userId) && (
                        <Styled.TrashIcon
                          onClick={() => handleDeletePost(id)}
                        />
                      )}
                    </Styled.PostCard>
                  );
                })
              : myPosts.map(({ id, text, username }, index) => {
                  return (
                    <Styled.PostCard key={index}>
                      <Styled.PostAuthorContainer>
                        <Styled.UserProfilePic />
                        <Styled.AuthorTitle>{username}</Styled.AuthorTitle>
                        <Styled.TrashIcon
                          onClick={() => handleDeletePost(id)}
                        />
                      </Styled.PostAuthorContainer>
                      <Styled.PostText>{text}</Styled.PostText>
                    </Styled.PostCard>
                  );
                })}
          </Styled.PostAreaContainer>
          {showModal && (
            <ModalConfirm
              message="Você tem certeza que deseja excluir esse post ?"
              onConfirm={handleConfirmDelete}
              onCancel={() => setShowModal(false)}
              onClickOutside={() => setShowModal(false)}
            />
          )}
        </Styled.NavPostContainer>
      </Styled.PostWrapper>
    </Styled.HomeContainer>
  );
};

export default Home;
