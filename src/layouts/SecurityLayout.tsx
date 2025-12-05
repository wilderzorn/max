import React from 'react';
import { getAuthorization } from '#/utils/authority';
import { Navigate, Outlet } from '@umijs/max';
import { ClickToComponent } from 'click-to-react-component';

const SecurityLayout = () => {
  const token = getAuthorization();
  if (!token) {
    return <Navigate to="/user" />;
  }
  return (
    <React.Fragment>
      <ClickToComponent editor={'vscode'} pathModifier={(path) => path} />
      <Outlet />
    </React.Fragment>
  );
};

export default SecurityLayout;
