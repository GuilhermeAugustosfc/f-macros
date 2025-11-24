import { type JSX } from 'react';
import styled, { keyframes } from 'styled-components';
import * as tokens from '@ftdata/f-tokens';
import { Button } from '@ftdata/ui';
import { useTranslation } from '@ftdata/core';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const ConfirmModalContainer = styled.div`
  align-items: center;
  animation: ${fadeIn} 0.2s ease-out;
  background-color: rgba(142, 150, 155, 0.32);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const Wrapper = styled.div`
  align-items: flex-start;
  animation: ${slideInScale} 0.2s ease-out;
  background-color: white;
  border: 1px solid #8B5CF6;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 8px 0px rgba(107, 117, 124, 0.32);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 90%;
  min-width: 20rem;
  padding: 2rem;
  position: relative;
  width: auto;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  right: 1rem;
  top: 1rem;
  
  &:hover {
    opacity: 0.7;
  }
`;

const InfoContent = styled.div`
  align-items: flex-start;
  color: ${tokens.COLOR_NEUTRAL_DUSK};
  display: flex;
  flex-direction: column;
  font-weight: 500;
  gap: 1.5rem;
  width: 100%;

  h2 {
    color: #26333B;
    font-size: 1.25rem;
    line-height: 1.2;
    letter-spacing: -0.006rem;
    margin: 0;
  }

  p {
    color: #6B757C;
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
    text-align: left;
  }
`;

const ButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: auto;
  width: 100%;
`;

export interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  iconName?: any;
  iconColor?: string;
  confirmButtonColor?: string;
  confirmButtonVariant?: 'primary' | 'secondary' | 'ghost';
}

export default function ConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  title,
  description,
  confirmText,
  cancelText,
  confirmButtonColor = tokens.COLOR_DANGER_MEDIUM,
  confirmButtonVariant = 'primary',
}: ConfirmationModalProps): JSX.Element | null {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <ConfirmModalContainer>
      <Wrapper>
        <CloseButton onClick={onCancel} aria-label="Fechar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#26333B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </CloseButton>
        <InfoContent>
          <h2>{title}</h2>
          <p>{description}</p>
        </InfoContent>

        <ButtonsContainer>
          <Button variant="ghost" onClick={onCancel}>
            {cancelText || t('cancel')}
          </Button>
          <Button
            variant={confirmButtonVariant}
            onClick={onConfirm}
            style={{ backgroundColor: confirmButtonColor }}
          >
            {confirmText || t('yes_i_want_to_continue')}
          </Button>
        </ButtonsContainer>
      </Wrapper>
    </ConfirmModalContainer>
  );
}
