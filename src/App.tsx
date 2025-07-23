import Routes from './routes';
import { Suspense } from 'react';
import LoadingFallback from './components/LoadingFallback';

const App = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes />
    </Suspense>
  );
};

export default App;
