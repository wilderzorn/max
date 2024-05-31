import { Outlet, Navigate } from '@umijs/max';
import { getAuthorization } from '@/utils/authority';

const SecurityLayout = () => {
  const token = getAuthorization();
  if (!token) {
    return <Navigate to="/user" />;
  }
  return <Outlet />;
};

export default SecurityLayout;
