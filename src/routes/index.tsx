import type React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReportsProvider } from 'src/contexts/reports';
import Welcome from 'src/pages/Welcome';
import instance from 'src/services/instance';
import { AppCore, DEFAULT_CONFIG } from '@ftdata/core';
import { Settings } from 'src/pages/Settings';
import { queryClient } from 'src/services/queryClient';
import MacrosReport from 'src/pages/MacrosReport';

const Routes: React.FC = () => {
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
              {
                path: '/report',
                element: <MacrosReport />,
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
