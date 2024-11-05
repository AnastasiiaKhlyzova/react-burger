import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import { getUser } from '../../services/auth-slice';


const ProtectedRouteElement: React.FC<{ element: JSX.Element; redirectTo?: string }> = ({ element, redirectTo = '/login' }) => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, isUserLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated]);

  if (isUserLoading) {
    return <div>Загрузка данных</div>; 
  }


  return isAuthenticated ? (
    element
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
};

export default ProtectedRouteElement;
