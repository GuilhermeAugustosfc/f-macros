import { Button, Paragraph, Title } from '@ftdata/styleguide';
import {
  CardContainer,
  CardContent,
  Container,
  ContainerImage,
  ContentWrapper,
  StyledButton,
  TextContent,
  Title3,
} from './style';
import { t } from '../../../App';
import HomePage from '../../../assets/svgs/emptyStates/homePage.svg?react';
import { useNavigate } from 'react-router-dom';

const ManagementReports: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title3>{t('play_videos_of_routes_and_check_occurrences')}</Title3>

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

            <StyledButton onClick={() => navigate('/inspect')}>
              <Button variant="primary">{t('access')}</Button>
            </StyledButton>
          </CardContent>
        </CardContainer>
      </ContentWrapper>
    </Container>
  );
};

export default ManagementReports;
