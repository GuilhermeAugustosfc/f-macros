import { Button, Paragraph, Title } from '@ftdata/ui';
import {
  CardContainer,
  CardContent,
  Container,
  ContainerImage,
  ContentWrapper,
  StyledButton,
  TextContent,
} from './style';
import HomePage from '../../../assets/svgs/emptyStates/homePage.svg?react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@ftdata/core';

const ManagementReports: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Container>
      <ContentWrapper>
        <CardContainer>
          <ContainerImage>
            <HomePage />
          </ContainerImage>

          <CardContent>
            <TextContent>
              <Title size="md">{t('custom_macros')}</Title>
              <Paragraph size="sm">{t('track_fleet_operational_states_real_time')}</Paragraph>
            </TextContent>

            <StyledButton onClick={() => navigate('/report')}>
              <Button variant="primary">{t('access_button')}</Button>
            </StyledButton>
          </CardContent>
        </CardContainer>
      </ContentWrapper>
    </Container>
  );
};

export default ManagementReports;
