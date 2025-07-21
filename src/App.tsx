import Routes from './routes';
import { Suspense } from 'react';
import LoadingFallback from './components/LoadingFallback';

export const t = (str: string) => {
  return str;
};

const App = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes />
    </Suspense>
  );
};

export default App;
