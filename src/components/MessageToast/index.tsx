import React from 'react';
import ErrorIcon from 'src/assets/svgs/error.svg?react';
import SuccessIcon from 'src/assets/svgs/done-check-checkmark.svg?react';
import styled from 'styled-components';

export interface MessageToastProps {
  title: string;
  message: string;
  subMessage?: string;
  timeInfo?: string;
  onClose?: () => void;
  type?: 'success' | 'error' | 'info' | 'warning';
}

const ToastWrapper = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

interface ToastContainerProps {
  type?: 'success' | 'error' | 'info' | 'warning';
}

const getBackgroundColor = (type?: string) => {
  switch (type) {
    case 'error':
      return '#480000';
    case 'success':
      return '#004838';
    case 'warning':
      return '#484800';
    case 'info':
      return '#003848';
    default:
      return '#004838';
  }
};

const getIconColor = (type?: string) => {
  switch (type) {
    case 'error':
      return '#FEDDE8';
    case 'success':
      return '#DDE8FE';
    case 'warning':
      return '#FEFEDD';
    case 'info':
      return '#DDFDFE';
    default:
      return '#DDE8FE';
  }
};

const ToastContainer = styled.div<ToastContainerProps>`
  width: 360px;
  min-height: 125px;
  background-color: ${({ type }) => getBackgroundColor(type)};
  border-radius: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 0px 4px 8px rgba(67, 74, 78, 0.32);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-right: 32px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.h3<ToastContainerProps>`
  color: ${({ type }) => getIconColor(type)};
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const Message = styled.p`
  color: #ffffff;
  font-size: 14px;
  margin: 0;
`;

const SubMessage = styled.p<ToastContainerProps>`
  color: ${({ type }) => getIconColor(type)};
  font-size: 12px;
  margin: 0;
`;

const TimeInfo = styled.span<ToastContainerProps>`
  color: ${({ type }) => getIconColor(type)};
  font-size: 12px;
  margin-top: 8px;
`;

const MessageToast: React.FC<MessageToastProps> = ({
  title,
  message,
  subMessage,
  timeInfo,
  onClose,
  type,
}) => {
  const Icons = type === 'success' ? SuccessIcon : ErrorIcon;
  return (
    <ToastWrapper>
      <ToastContainer type={type}>
        <CloseButton onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4L12 12M4 12L12 4" stroke="white" strokeWidth="1.5" />
          </svg>
        </CloseButton>

        <ContentContainer>
          <HeaderContainer>
            <Icons
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke={getIconColor(type)}
            />
            <Title type={type}>{title}</Title>
          </HeaderContainer>

          <div>
            <Message>{message}</Message>
            {subMessage && <SubMessage type={type}>{subMessage}</SubMessage>}
          </div>

          {timeInfo && <TimeInfo type={type}>{timeInfo}</TimeInfo>}
        </ContentContainer>
      </ToastContainer>
    </ToastWrapper>
  );
};

export default MessageToast;
