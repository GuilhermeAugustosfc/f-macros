import React, { Fragment, useState } from 'react';
import { Tab } from '@headlessui/react';
import { TransitionContainer } from './TransitionContainer';
import { Form } from './Form';
import { TabsContainer } from './styles';
import { useTranslation } from 'react-i18next';
import { SavedFilters } from './SavedFilters';
import { ReportInsertData } from '../../requets';

interface Props {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    clearFilterCallback: () => void;
    showCleanFilter: boolean;
    applyFilter: (params: ReportInsertData, serialize?: boolean) => void;
}

export const FilterModal: React.FC<Props> = ({
    isOpen,
    open,
    close,
    applyFilter,
    showCleanFilter,
    clearFilterCallback,
}: Props) => {
    const [currentTab, setCurrentTab] = useState(0);
    const { t } = useTranslation('114');

    const changeTab = (index: number) => {
        setCurrentTab(index);
    };

    const [showCheckbox, setShowCheckbox] = useState(false);

    const changeCheckbox = () => {
        setShowCheckbox(!showCheckbox);
    };

    return (
        <TransitionContainer
            isOpen={isOpen}
            close={close}
            open={open}
            showCleanFilter={showCleanFilter && currentTab === 0}
            clearFilterCallback={clearFilterCallback}
            changeTab={changeTab}
            changeCheckbox={changeCheckbox}
        >
            <TabsContainer>
                <Tab.Group selectedIndex={currentTab} onChange={setCurrentTab}>
                    <Tab.List className="tab-list">
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
                    </Tab.List>
                    <Tab.Panels className="tab-panels">
                        <Tab.Panel className="tab-panel">
                            <Form close={close} applyFilter={(params) => applyFilter(params)} />
                        </Tab.Panel>
                        <Tab.Panel className="tab-panel">
                            <SavedFilters showCheckbox={showCheckbox} applyFilter={applyFilter} />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </TabsContainer>
        </TransitionContainer>
    );
};
