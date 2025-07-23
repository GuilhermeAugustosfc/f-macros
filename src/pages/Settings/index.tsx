import { type JSX } from 'react';
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
import KeyIcon from '../../assets/svgs/key.svg?react';
import { useTranslation } from '@ftdata/core';

export const Settings = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <GridContainer>
      <TittleContainerGrid>
        <Title size="section">{t('settings')}</Title>
      </TittleContainerGrid>
      <TabsContainerGrid>
        <ContainerTabs>
          <Tab icon={KeyIcon} title={t('access_activation')} />
        </ContainerTabs>
      </TabsContainerGrid>
      <ContentContainerGrid>
        <ActiveAccess />
      </ContentContainerGrid>
    </GridContainer>
  );
};
