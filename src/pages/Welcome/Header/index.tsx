import { Button, Paragraph, Title } from '@ftdata/styleguide';
import { Container, ContainerButtonConfiguration, ContainerPresentation } from './style';
import { t } from '../../../App';
import { Icon } from '@ftdata/icons';
import * as styleguide from '@ftdata/tokens';

const Header: React.FC = () => {
  return (
    <Container>
      <ContainerPresentation>
        <Title size="section">
          {t('welcome_to_f_check_smart_inspections_on_fulltrack')} !<span>{t('new')}</span>
        </Title>
        <Paragraph size="sm">
          {t('standardize_surveys_and_inspections_with_automation_and_rea_time_control')}.
        </Paragraph>
      </ContainerPresentation>
      <ContainerButtonConfiguration>
        <Icon name="ui settings" color={styleguide.COLOR_NEUTRAL_DAY} />
        <Button variant="primary" color={styleguide.COLOR_NEUTRAL_DAY}>
          {t('settings')}
        </Button>
      </ContainerButtonConfiguration>
    </Container>
  );
};

export default Header;
