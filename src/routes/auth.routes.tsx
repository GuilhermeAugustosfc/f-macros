import { Route, Routes } from 'react-router-dom';
import HealthCheck from '../pages/healthCheck';
import Welcome from '../pages/Welcome';
import Inspect from '../pages/Inspect';

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" Component={Welcome} />
      <Route path="/health-check" Component={HealthCheck} />
      <Route path="/inspect" Component={Inspect} />
    </Routes>
  );
};

export default AuthRoutes;
