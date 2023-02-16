import { useEffect, useRef } from 'react';
import { Styled } from './styles';

interface IModalConfirm {
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClickOutside: () => void;
}

const ModalConfirm = ({
  message,
  onConfirm,
  onCancel,
  onClickOutside,
}: IModalConfirm) => {
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        onClickOutside();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [componentRef]);
  return (
    <Styled.ModalWrapper>
      <Styled.ModalContent ref={componentRef}>
        <Styled.ModalText>{message}</Styled.ModalText>
        <Styled.ButtonWrapper>
          <Styled.ModalButton onClick={onConfirm}>Confirm</Styled.ModalButton>
          <Styled.ModalButton btnType="cancel" onClick={onCancel}>
            Cancel
          </Styled.ModalButton>
        </Styled.ButtonWrapper>
      </Styled.ModalContent>
    </Styled.ModalWrapper>
  );
};

export default ModalConfirm;
