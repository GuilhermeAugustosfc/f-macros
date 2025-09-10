import type React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReportsProvider } from 'src/contexts/reports';
import Welcome from 'src/pages/Welcome';
import instance from 'src/services/instance';
import { AppCore, DEFAULT_CONFIG } from '@ftdata/core';
import { Settings } from 'src/pages/Settings';

const Routes: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <ReportsProvider>
      <QueryClientProvider client={queryClient}>
        <AppCore
          config={{
            ...DEFAULT_CONFIG,
            routes: [
              {
                path: '/',
                element: <Welcome />,
              },
              {
                path: '/settings',
                element: <Settings />,
              },
            ],
            navbar: {
              breadcrumb: true,
            },
            module: 'f-macros',
            environment: {
              S3_URL: import.meta.env.VITE_S3_URL || '',
            },
            httpInstance: instance,
            namespace: '114',
          }}
        />
      </QueryClientProvider>
    </ReportsProvider>
  );
};

export default Routes;
