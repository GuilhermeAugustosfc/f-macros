import { type JSX, useState } from 'react';
import {
  ContainerTabs,
  ContentContainerGrid,
  GridContainer,
  TabsContainerGrid,
  TittleContainerGrid,
} from './styles';
import { Tab } from './Tab';
import { Title } from '@ftdata/ui';
import { ActiveAccess } from './ActiveAccess';
import { MacroGroups } from './MacroGroups';
import KeyIcon from '../../assets/svgs/key.svg?react';
import GroupIcon from '../../assets/svgs/group.svg?react';
import { useTranslation } from '@ftdata/core';

export const Settings = (): JSX.Element => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'access' | 'groups'>('access');

  const handleTabClick = (tab: 'access' | 'groups') => {
    setActiveTab(tab);
  };

  return (
    <GridContainer>
      <TittleContainerGrid>
        <Title size="section">{t('settings')}</Title>
      </TittleContainerGrid>
      <TabsContainerGrid>
        <ContainerTabs>
          <Tab
            icon={KeyIcon}
            title={t('access_activation')}
            isActive={activeTab === 'access'}
            onClick={() => handleTabClick('access')}
          />
          <Tab
            icon={GroupIcon}
            title="Grupos de Macros"
            isActive={activeTab === 'groups'}
            onClick={() => handleTabClick('groups')}
          />
        </ContainerTabs>
      </TabsContainerGrid>
      <ContentContainerGrid>
        {activeTab === 'access' && <ActiveAccess />}
        {activeTab === 'groups' && <MacroGroups />}
      </ContentContainerGrid>
    </GridContainer>
  );
};
