import type React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReportsProvider } from 'src/contexts/reports';
import { TableProvider } from 'src/contexts/table';
import Welcome from 'src/pages/Welcome';
import instance from 'src/services/instance';
import { AppCore, DEFAULT_CONFIG } from '@ftdata/core';
import Inspect from 'src/pages/Inspect';
import { Settings } from 'src/pages/Settings';

const Routes: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <ReportsProvider>
      <TableProvider>
        <QueryClientProvider client={queryClient}>
          {/* <AuthRoutes /> */}
          <AppCore
            config={{
              ...DEFAULT_CONFIG,
              routes: [
                {
                  path: '/',
                  element: <Welcome />,
                },
                {
                  path: '/inspect',
                  element: <Inspect />,
                },
                {
                  path: '/settings',
                  element: <Settings />,
                },
              ],
              navbar: {
                breadcrumb: true,
              },
              module: 'f-inspect',
              environment: {
                S3_URL: import.meta.env.VITE_S3_URL || '',
              },
              httpInstance: instance,
              namespace: '114',
            }}
          >
            <div></div>
          </AppCore>
        </QueryClientProvider>
      </TableProvider>
    </ReportsProvider>
  );
};

export default Routes;
