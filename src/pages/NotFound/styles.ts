import styled from 'styled-components';

const NotFoundContainer = styled.div`
  width: 100%;
  height: calc(100vh - 8rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NotFoundStatus = styled.h1`
  font: 5rem 'Open Sans';
  font-weight: 400;
`;

const NotFoundText = styled.h1`
  font: 2rem 'Open Sans';
  font-weight: 400;
`;

export const Styled = { NotFoundContainer, NotFoundStatus, NotFoundText };
