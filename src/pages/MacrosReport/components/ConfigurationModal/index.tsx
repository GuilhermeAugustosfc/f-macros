import React, { type ReactNode } from 'react';
import { TransitionContainer } from './TransitionContainer';

interface Props {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  titleHeader: string;
  children: ReactNode;
}

export const ConfigurationModal: React.FC<Props> = ({
  isOpen,
  open,
  close,
  titleHeader,
  children,
}: Props) => {
  return (
    <TransitionContainer titleHeader={titleHeader} isOpen={isOpen} close={close} open={open}>
      {children}
    </TransitionContainer>
  );
};
