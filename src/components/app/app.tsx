import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../app-header/app-header';

import styles from './app.module.css';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import HomePage from '../../pages/home/home';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import OrdersHistoryPage from '../../pages/profile/order-history';
import OrderDetailsPage from '../../pages/profile/order-details';
import ProtectedRouteLogin from '../protected-routes/protected-route-for-login';
import ProtectedRouteElement from '../protected-routes/protected-route';
import { RootState, AppDispatch } from '../../services/store';
import IngredientPage from '../../pages/ingredient/ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { fetchIngredients, setCurrentIngredient } from '../../services/ingredients-slice';

function App() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { ingredients, status } = useSelector((state: RootState) => state.ingredients);
  const currentIngredient = useSelector((state: RootState) => state.ingredients.currentIngredient);
  const passwordResetRequested = useSelector((state: RootState) => state.auth.passwordResetRequested);

  const shouldFetchIngridient = status === 'idle'


  useEffect(() => {
    if (shouldFetchIngridient) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, shouldFetchIngridient, status]);

  useEffect(() => {
    const ingredientId = location.pathname.match(/\/ingredients\/(\w+)/)?.[1];
    if (ingredientId && ingredients.length > 0) {
      const ingredient = ingredients.find(item => item._id === ingredientId);
      if (ingredient) {
        dispatch(setCurrentIngredient(ingredient));
      }
    }
  }, [location.pathname, dispatch, ingredients]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.wrapper}>
        <AppHeader />
        <main>
          <Routes location={backgroundLocation || location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<ProtectedRouteLogin element={<LoginPage />} />} />
            <Route path="/register" element={<ProtectedRouteLogin element={<RegisterPage />} />} />
            <Route path="/forgot-password" element={<ProtectedRouteLogin element={<ForgotPasswordPage />} />} />
            <Route
              path="/reset-password"
              element={passwordResetRequested ? <ProtectedRouteLogin element={<ResetPasswordPage />} /> : <Navigate to="/forgot-password" replace />}
            />
            <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />}>
              <Route path="orders" element={<OrdersHistoryPage />} />
              <Route path="orders/:id" element={<OrderDetailsPage />} />
            </Route>
            <Route path="/ingredients/:id" element={<IngredientPage />} />
          </Routes>

          {backgroundLocation && (
            <Modal title="Детали ингредиента" onClose={() => navigate(-1)}>
              {currentIngredient ? <IngredientDetails ingredient={currentIngredient} className="withBackground" /> : <p>Загрузка...</p>}
            </Modal>
          )}
        </main>
      </div>
    </DndProvider>
  );
}

export default App;
