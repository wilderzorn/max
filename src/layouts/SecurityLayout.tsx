import { getAuthorization } from '#/utils/authority';
import { Navigate, Outlet } from '@umijs/max';
import React from 'react';

const SecurityLayout = () => {
  const token = getAuthorization();
  if (!token) {
    return <Navigate to="/user" />;
  }
  return <Outlet />;
};

export default SecurityLayout;
