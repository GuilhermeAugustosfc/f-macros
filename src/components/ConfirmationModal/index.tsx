import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { MyButton } from '../MyButton';
import { useTranslation } from '@ftdata/core';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

Modal.setAppElement('#root');

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  const { t } = useTranslation();

  return (
    <CSSTransition in={isOpen} timeout={100} classNames="modal" unmountOnExit>
      <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel={title} style={modalStyles}>
        <ModalContent>
          <h2>{title}</h2>
          <p>{message}</p>
          <ModalActions>
            <MyButton variant="secondary" title={t('cancel')} action={onClose} />
            <MyButton iconType="delete" title={t('yes_you_can_delete')} action={onConfirm} />
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

  h2 {
    color: #26333b;
    font-feature-settings: 'liga' off;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    letter-spacing: -0.6px;
    margin-bottom: 24px;
    text-align: start;
  }

  p {
    color: #6b757c;
    font-feature-settings: 'liga' off;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    margin-bottom: 32px;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 16px;
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
    minHeight: '232px',
    boxShadow: '0px 4px 8px 0px rgba(107, 117, 124, 0.32)',
  },
};
