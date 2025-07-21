import React from 'react';
import {
  BadgeFilter,
  Container,
  ContainerSearch,
  ContainerTabs,
  FilterContainer,
  FilterIconSearch,
  Filters,
  HeaderContainer,
  KnowMore,
  TitleHeader,
} from './styles';
import Tabs from '../Tabs';
import { Button } from '@ftdata/ui';
import { t } from 'src/App';
import { Icon } from '@ftdata/f-icons';
import UserIcon from 'src/assets/svgs/user.svg?react';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }: Props) => {
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
        <div>
          <Icon name="ui download-save-simple" />
          <Button variant="primary">{t('download')}</Button>
        </div>
      </HeaderContainer>

      <FilterContainer>
        <div>{t('visualizando')} : </div>

        <Filters>
          <BadgeFilter>
            <UserIcon />
            <span> Protege Segurança </span>
          </BadgeFilter>
          <BadgeFilter>
            <UserIcon />
            <span> Protege Segurança </span>
          </BadgeFilter>
          <BadgeFilter>
            <UserIcon />
            <span> Protege Segurança </span>
          </BadgeFilter>
          <BadgeFilter>
            <UserIcon />
            <span> Protege Segurança </span>
          </BadgeFilter>
          <BadgeFilter>
            <UserIcon />
            <span> Protege Segurança </span>
          </BadgeFilter>
          <BadgeFilter>
            <UserIcon />
            <span> Protege Segurança </span>
          </BadgeFilter>
          <BadgeFilter>
            <UserIcon />
            <span> Protege Segurança </span>
          </BadgeFilter>
        </Filters>

        <FilterIconSearch>
          <Icon name="ui filter-sort-favorite-edit" />
          <ContainerSearch>
            <Icon name="ui search-loupe" />
            <input
              placeholder={t('research') + '...'}
              onChange={() => console.log('pesquisando....')}
              type="text"
            />
          </ContainerSearch>
        </FilterIconSearch>
      </FilterContainer>

      <ContainerTabs>
        <Tabs />
      </ContainerTabs>
    </Container>
  );
};

export default Header;
