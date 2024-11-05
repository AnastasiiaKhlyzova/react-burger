import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authRequest } from '../../utils/apiUtils';
import { GET_USER } from '../../utils/constants';

interface PprotectedRouteLoginProps {
  element: JSX.Element;
  redirectTo?: string;
}

const PprotectedRouteLogin: React.FC<PprotectedRouteLoginProps> = ({ element, redirectTo = '/' }) => {
  const location = useLocation();
  const [authState, setAuthState] = useState({ isUserLoading: true, isAuthenticated: false });

  useEffect(() => {
    authRequest<{ success: boolean; user: { name: string; email: string } }>(GET_USER, { method: 'GET' })
      .then((response) => {
        setAuthState({ isUserLoading: false, isAuthenticated: response.success });
      })
      .catch((error) => {
        console.error('Ошибка при проверке аутентификации пользователя:', error);
        setAuthState({ isUserLoading: false, isAuthenticated: false });
      });
  }, []);

  if (authState.isUserLoading) return null; 

  return authState.isAuthenticated ? (
    <Navigate to={redirectTo} state={{ from: location }} />
  ) : (
    element
  );
};

export default PprotectedRouteLogin;
