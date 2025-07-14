import { initInstance } from '@ftdata/http';
import './reset.css';
import Routes from './routes';
import { Suspense } from 'react';
import LoadingFallback from './components/LoadingFallback';

export const t = (str: string) => {
  return str;
};

export const instance = initInstance({
  baseUrl: 'https://api-fulltrack4.ftdata.com.br',
});

const App = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes />
    </Suspense>
  );
};

export default App;
