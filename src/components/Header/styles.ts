import styled from 'styled-components';

const Header = styled.header`
  position: relative;
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fe4a49;
  border-bottom: 1px solid #cb0101;
`;

const HeaderTitle = styled.h1`
  font: 1.5rem 'Open Sans';
  font-weight: 300;
  color: #f4f4f8;
  margin-left: 0.3rem;
  cursor: pointer;
`;

export const Styled = {
  Header,
  HeaderTitle,
};
