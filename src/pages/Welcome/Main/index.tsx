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
              <Title size="md">F/Inspect</Title>
              <Paragraph size="sm">{t('description_text_finspect')}</Paragraph>
            </TextContent>

            <StyledButton onClick={() => navigate('/report')}>
              <Button variant="primary">{t('access')}</Button>
            </StyledButton>
          </CardContent>
        </CardContainer>
      </ContentWrapper>
    </Container>
  );
};

export default ManagementReports;
