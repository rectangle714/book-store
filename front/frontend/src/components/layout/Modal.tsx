import React from 'react';
import styled from 'styled-components';

interface modal{
    title: string,
    contents: string,
    closeModal: string,
}

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`;

const Modal = ({ title, contents, closeModal }: modal) => {
  return (
    <ModalBackdrop>
      <ModalContent>
        <CloseButton onClick={() => closeModal}>&times;</CloseButton>
        <h2>{title}</h2>
        <p>{contents}</p>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default Modal;