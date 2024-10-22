import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';

type PrivateRouteProps = {
  children: JSX.Element;
  roleRequired: 'not member' | 'admin' | 'normal member' | 'special member' | 'others';  // 必要な役割を指定
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children, roleRequired }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.user_attribute_name !== roleRequired && user.user_attribute_name !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};
