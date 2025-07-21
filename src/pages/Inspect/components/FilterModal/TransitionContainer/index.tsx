import React, { Fragment, type ReactNode, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Header } from '../Header';
import { ContainerModal, ContentModal, Wrapper } from './styles';
import { ReportsContext } from 'src/contexts/reports';
import { Icon } from '@ftdata/f-icons';
import { StateAlert } from '@ftdata/ui';
interface Props {
  children: ReactNode;
  isOpen: boolean;
  close: () => void;
}

export const TransitionContainer: React.FC<Props> = ({ children, isOpen, close }: Props) => {
  const { alertState, setAlertState } = useContext(ReportsContext);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <Wrapper>
          <ContainerModal>
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300 sm:duration-400"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300 sm:duration-400"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                <ContentModal>
                  <Dialog.Title>
                    {alertState.open ? (
                      <StateAlert
                        type={alertState.type}
                        message={alertState.message}
                        icon={<Icon name={alertState.icon} color="currentColor" />}
                        onClose={() => setAlertState({ ...alertState, open: false })}
                      />
                    ) : (
                      ''
                    )}

                    <Header close={close} />
                  </Dialog.Title>
                  {children}
                </ContentModal>
              </Dialog.Panel>
            </Transition.Child>
          </ContainerModal>
        </Wrapper>
      </Dialog>
    </Transition.Root>
  );
};
