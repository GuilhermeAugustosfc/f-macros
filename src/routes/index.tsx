import type React from 'react';
import AuthRoutes from './auth.routes';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

const ModuleContent = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Routes: React.FC = () => {
  return (
    <ModuleContent>
      <BrowserRouter>
        <AuthRoutes />
      </BrowserRouter>
    </ModuleContent>
  );
};

export default Routes;
