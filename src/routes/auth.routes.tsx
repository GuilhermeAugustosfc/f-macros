import { Route, Routes } from 'react-router-dom';
import HealthCheck from '../pages/healthCheck';
import Welcome from '../pages/Welcome';
import { Settings } from '../pages/Settings/index';
import Inspect from '../pages/Inspect/index';

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" Component={Welcome} />
      <Route path="/health-check" Component={HealthCheck} />
      <Route path="/settings" Component={Settings} />
      <Route path="/inspect" Component={Inspect} />
    </Routes>
  );
};

export default AuthRoutes;
