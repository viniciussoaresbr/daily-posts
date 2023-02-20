import { Styled } from './styles';

const NotFound = () => {
  return (
    <Styled.NotFoundContainer>
      <Styled.NotFoundStatus>404</Styled.NotFoundStatus>
      <Styled.NotFoundText>Page Not Found</Styled.NotFoundText>
    </Styled.NotFoundContainer>
  );
};

export default NotFound;
