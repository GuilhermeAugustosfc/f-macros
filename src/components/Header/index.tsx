import React from 'react';
import {
  Container,
  ContainerSpan,
  ContainerTabs,
  HeaderContainer,
  KnowMore,
  SubTitleSpan,
  TitleHeader,
  TitleSpan,
} from './styles';
import Tabs, { type ActiveTab } from '../../pages/Inspect/components/Tabs';
import { Button } from '@ftdata/ui';
import { Icon } from '@ftdata/f-icons';
import { useTranslation } from '@ftdata/core';

interface Props {
  title: string;
  buttonDownload?: boolean;
  tab: ActiveTab;
  children?: React.ReactNode;
  subTitle: string;
}

function IconComponent() {
  return <Icon name="ui download-save-simple" />;
}

const Header: React.FC<Props> = ({ title, children, tab, subTitle, buttonDownload }: Props) => {
  const { t } = useTranslation();
  return (
    <Container>
      <HeaderContainer justifyContent="space-between">
        <TitleHeader>
          {title}
          <KnowMore>
            <Icon name="ui question" />
            <span>{t('know_more')}</span>
          </KnowMore>
        </TitleHeader>
        {buttonDownload && (
          <div>
            <Button LeftIcon={IconComponent} variant="primary">
              {t('download')}
            </Button>
          </div>
        )}
      </HeaderContainer>

      {children}

      <ContainerTabs>
        <Tabs activeTab={tab} />
      </ContainerTabs>

      <ContainerSpan>
        <TitleSpan>{title}</TitleSpan>
        <SubTitleSpan>{subTitle}</SubTitleSpan>
      </ContainerSpan>
    </Container>
  );
};

export default Header;
