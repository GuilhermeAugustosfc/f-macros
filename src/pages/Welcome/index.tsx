import Header from '../Welcome/Header';
import Main from '../Welcome/Main';
import { Container, Wrapper } from './styles';

const Welcome: React.FC = () => {
  return (
    <Wrapper>
      <Header />
      <Container>
        <Main />
      </Container>
    </Wrapper>
  );
};

export default Welcome;
