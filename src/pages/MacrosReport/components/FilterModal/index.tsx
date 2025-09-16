import React, { Fragment, useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { TransitionContainer } from './TransitionContainer';
import { Form } from './Form';
import { TabsContainer } from './styles';
import { useTranslation } from '@ftdata/core';
import { SavedFilters } from './SavedFilters';

interface Props {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  clearFilterCallback: () => void;
  applyFilter: (params: any, serialize?: boolean) => void;
}

export const FilterModal: React.FC<Props> = ({
  isOpen,
  open,
  close,
  applyFilter,
  clearFilterCallback,
}: Props) => {
  const [currentTab, setCurrentTab] = useState(0);
  const { t } = useTranslation('114');

  return (
    <TransitionContainer
      isOpen={isOpen}
      close={close}
      open={open}
      clearFilterCallback={clearFilterCallback}
    >
      <TabsContainer>
        <TabGroup selectedIndex={currentTab} onChange={setCurrentTab}>
          <TabList className="tab-list">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button className={selected ? 'tab selected' : 'tab'}>{t('filter_by')}</button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button className={selected ? 'tab selected' : 'tab'}>{t('saved_filters')}</button>
              )}
            </Tab>
          </TabList>
          <TabPanels className="tab-panels">
            <TabPanel className="tab-panel">
              <Form close={close} applyFilter={(params) => applyFilter(params)} />
            </TabPanel>
            <TabPanel className="tab-panel">
              <SavedFilters applyFilter={applyFilter} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </TabsContainer>
    </TransitionContainer>
  );
};
