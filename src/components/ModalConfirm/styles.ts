import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  gap: 20px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ModalButton = styled.button<{ btnType?: string }>`
  font: 1rem 'Open Sans';
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: ${({ btnType }) =>
    btnType === 'cancel' ? '#fe4a49' : '#e6e6ea'};
  cursor: pointer;
  :hover {
    background-color: ${({ btnType }) =>
      btnType === 'cancel' ? '#FE3434' : '#D3D3D9'};
  }
`;

const ModalText = styled.p`
  font: 1rem 'Open Sans';
  color: #25252c;
`;

export const Styled = {
  ModalWrapper,
  ModalContent,
  ModalButton,
  ModalText,
  ButtonWrapper,
};
