import React, { Fragment, type ReactNode } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Header } from '../Header';
import { ContainerModal, ContentModal, Wrapper } from './styles';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  clearFilterCallback: () => void;
}

export const TransitionContainer: React.FC<Props> = ({
  children,
  isOpen,
  open,
  close,
  clearFilterCallback,
}: Props) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={open}>
        <TransitionChild
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <Wrapper>
          <ContainerModal>
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-in-out duration-300 sm:duration-400"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300 sm:duration-400"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="pointer-events-auto relative w-screen max-w-md">
                <ContentModal>
                  <DialogTitle>
                    <Header close={close} clearFilterCallback={clearFilterCallback} />
                  </DialogTitle>
                  {children}
                </ContentModal>
              </DialogPanel>
            </TransitionChild>
          </ContainerModal>
        </Wrapper>
      </Dialog>
    </Transition>
  );
};
