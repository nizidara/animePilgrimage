import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type RequireStateProps = {
  children: JSX.Element;
  stateKey: string;  // 画面遷移時に location.state で受け取る必須の値
}

// location.state を前提とするページ用。URL直接アクセスなどで値が無い場合はトップへ戻す
export const RequireState: FC<RequireStateProps> = ({ children, stateKey }) => {
  const location = useLocation();

  if (location.state?.[stateKey] == null) {
    return <Navigate to="/" replace />;
  }

  return children;
};
