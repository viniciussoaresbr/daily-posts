import styled from 'styled-components';

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fe4a49;
  border-top: 1px solid #cb0101;
`;

const FooterTitle = styled.h1`
  font: 1.2rem 'Open Sans';
  font-weight: 300;
  color: #f4f4f8;
  margin-left: 0.3rem;
`;

export const Styled = {
  Footer,
  FooterTitle,
};
