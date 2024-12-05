import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import {wsMiddlewareWrapper} from './wsMiddleware';
import { setOrders as setOrdersFull } from './feed-orders-slice';
import { WS_ORDERS_URL, WS_USER_ORDERS_URL } from '../utils/constants';
import { getAccessToken } from '../utils/auth-tokens';
import { setOrders as setOrdersUser } from './history-orders-slice';

const token = getAccessToken(); 

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      wsMiddlewareWrapper({setOrders: setOrdersFull, SOCKET_URL: WS_ORDERS_URL, actionType:  'orders/connect' }), 
      wsMiddlewareWrapper({setOrders: setOrdersUser,SOCKET_URL: `${WS_USER_ORDERS_URL}?token=${token}`, actionType: 'orderHistory/connect'})
    ), 
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default store;
