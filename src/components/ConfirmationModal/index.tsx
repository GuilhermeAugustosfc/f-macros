import { type JSX } from 'react';
import styled, { keyframes } from 'styled-components';
import * as tokens from '@ftdata/f-tokens';
import { Button } from '@ftdata/ui';
import { useTranslation } from '@ftdata/core';
import { Icon } from '@ftdata/f-icons';

const slideUp = keyframes`
  0% {
    transform: translateY(30%);
  }
  100% {
    transform: translateY(0);
  }
`;

const ConfirmModalContainer = styled.div`
  align-items: flex-end;
  background-color: rgba(142, 150, 155, 0.32);
  display: flex;
  height: calc(100% - 4rem);
  position: absolute;
  top: 4rem;
  width: 100%;
  z-index: 1000;
`;

const Wrapper = styled.div`
  animation: ${slideUp} 0.2s ease-out;
  align-items: center;
  background-color: white;
  border-radius: 0.75rem 0.75rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.75rem 1.5rem 1.25rem 1.5rem;
  width: 100%;
`;

const IconContainer = styled.div<{ $iconColor: string }>`
  align-items: center;
  background-color: rgba(225, 145, 153, 0.1);
  border-radius: 50%;
  color: ${props => props.$iconColor};
  display: flex;
  height: 6.75rem;
  justify-content: center;
  width: 6.75rem;
`;

const InfoContent = styled.div`
  align-items: center;
  color: ${tokens.COLOR_NEUTRAL_DUSK};
  display: flex;
  flex-direction: column;
  font-weight: 500;
  gap: 1rem;
  width: 100%;

  h2 {
    font-size: 1.25rem;
    line-height: 1.5rem;
    letter-spacing: ${tokens.LETTER_SPACING_TIGHT};
  }

  p {
    max-width: 90%;
    text-align: center;
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const ButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding-top: 1rem;
  width: 100%;

  button {
    width: 100%;
  }
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
  iconName = 'ui trash-delete-bin-1' as const,
  iconColor = tokens.COLOR_DANGER_MEDIUM,
  confirmButtonColor = tokens.COLOR_DANGER_MEDIUM,
  confirmButtonVariant = 'primary',
}: ConfirmationModalProps): JSX.Element | null {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <ConfirmModalContainer>
      <Wrapper>
        <IconContainer $iconColor={iconColor}>
          <Icon name={iconName} color="currentColor" size="3rem" />
        </IconContainer>
        <InfoContent>
          <h2>{title}</h2>
          <p>{description}</p>
        </InfoContent>

        <ButtonsContainer>
          <Button
            variant={confirmButtonVariant}
            onClick={onConfirm}
            style={{ backgroundColor: confirmButtonColor }}
          >
            {confirmText || t('yes_i_want_to_continue')}
          </Button>
          <Button variant="ghost" onClick={onCancel}>
            {cancelText || t('cancel')}
          </Button>
        </ButtonsContainer>
      </Wrapper>
    </ConfirmModalContainer>
  );
}