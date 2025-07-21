import React from 'react';
import { TabGroup, TabPanel, TabPanels } from '@headlessui/react';
import { TransitionContainer } from './TransitionContainer';
import Form from './Form';
import { TabsContainer } from './styles';

interface Props {
  isOpen: boolean;
  close: () => void;
}

export const FilterModal: React.FC<Props> = ({ isOpen, close }: Props) => {
  return (
    <TransitionContainer isOpen={isOpen} close={close}>
      <TabsContainer>
        <TabGroup>
          <TabPanels className="tab-panels">
            <TabPanel className="tab-panel">
              <Form close={close} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </TabsContainer>
    </TransitionContainer>
  );
};
