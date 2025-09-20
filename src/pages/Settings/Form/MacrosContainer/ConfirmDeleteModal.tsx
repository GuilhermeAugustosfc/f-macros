import React, { useRef } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { MyButton } from 'src/components/MyButton';
import TrashIcon from '../../../../../assets/svgs/trash.svg';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  macroName?: string;
}

Modal.setAppElement('#root');

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  macroName,
}) => {
  const nodeRef = useRef(null);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <CSSTransition in={isOpen} timeout={100} classNames="modal" unmountOnExit nodeRef={nodeRef}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Confirmar Exclusão"
        style={modalStyles}
      >
        <ModalContent>
          <CloseButton onClick={onClose}>
            <img src={TrashIcon} alt="Close" width={24} height={24} />
          </CloseButton>

          <ModalTitle>Você tem certeza que gostaria de excluir?</ModalTitle>

          <ModalDescription>
            Os registros serão permanentemente excluídos e não poderão ser recuperados.
          </ModalDescription>

          <ModalActions>
            <MyButton variant="secondary" title="Cancelar" action={onClose} />
            <MyButton variant="danger" title="Sim, quero excluir" action={handleConfirm} />
          </ModalActions>
        </ModalContent>
      </Modal>
    </CSSTransition>
  );
};

const ModalContent = styled.div`
  padding: 32px;
  border-radius: 8px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  box-shadow: 0px 4px 8px 0px rgba(107, 117, 124, 0.32);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }
`;

const ModalTitle = styled.h2`
  color: #26333b;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.6px;
  margin: 0;
`;

const ModalDescription = styled.p`
  color: #6b757c;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  margin: 0;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 8px;
`;

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '0',
    borderRadius: '8px',
    width: '504px',
    minHeight: '200px',
    boxShadow: '0px 4px 8px 0px rgba(107, 117, 124, 0.32)',
  },
};
