import Routes from './routes';
import { Suspense } from 'react';
import LoadingFallback from './components/LoadingFallback';
import { ToastProvider } from './contexts/toast';

const App = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </Suspense>
  );
};

export default App;
