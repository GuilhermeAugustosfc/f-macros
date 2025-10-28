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

const ManagementReports: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <ContentWrapper>
        <CardContainer>
          <ContainerImage>
            <HomePage />
          </ContainerImage>

          <CardContent>
            <TextContent>
              <Title size="md">Macros Personalizadas</Title>
              <Paragraph size="sm">
                Acompanhe em tempo real os estados operacionais da sua frota e transforme dados em
                decisões estratégicas com eficiência e precisão.
              </Paragraph>
            </TextContent>

            <StyledButton onClick={() => navigate('/report')}>
              <Button variant="primary">Acessar</Button>
            </StyledButton>
          </CardContent>
        </CardContainer>
      </ContentWrapper>
    </Container>
  );
};

export default ManagementReports;
