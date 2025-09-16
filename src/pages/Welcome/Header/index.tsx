import { Button, Paragraph, Title } from '@ftdata/ui';
import { Container, ContainerButtonConfiguration, ContainerPresentation } from './style';
import { Icon } from '@ftdata/f-icons';
import * as styleguide from '@ftdata/f-tokens';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@ftdata/core';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container>
      <ContainerPresentation>
        <Title size="section">
          Bem-vindo ao módulo de macros personalizadas !<span>{t('new')}</span>
        </Title>

        <Paragraph size="sm">Jornadas personalizáveis no Fulltrack!</Paragraph>
      </ContainerPresentation>
      <ContainerButtonConfiguration>
        <Icon name="ui settings" color={styleguide.COLOR_NEUTRAL_DAY} />
        <Button
          variant="ghost"
          color={styleguide.COLOR_NEUTRAL_DAY}
          onClick={() => navigate('/settings')}
        >
          {t('settings')}
        </Button>
      </ContainerButtonConfiguration>
    </Container>
  );
};

export default Header;
