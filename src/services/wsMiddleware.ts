import { Middleware } from '@reduxjs/toolkit';
import { SetOrdersFull } from './feed-orders-slice';
import { SetOrdersPersonal } from './history-orders-slice';


interface Props {
  setOrders: SetOrdersFull | SetOrdersPersonal;
  SOCKET_URL: string;
  actionType: string
}

export function wsMiddlewareWrapper({setOrders, SOCKET_URL, actionType}: Props): Middleware {
  return (store) => (next) => (action: any) => {
    if (action.type ===actionType) {
      console.log('Connecting to WebSocket...'); 
      const socket = new WebSocket(SOCKET_URL);
  
      socket.onmessage = event => {
        const data = JSON.parse(event.data);
        console.log('Received data:', data); 
        if (data.success) {
          store.dispatch(setOrders(data));
        }
      };
  
      socket.onopen = () => {
        console.log('WebSocket connection established');
      };
  
      socket.onclose = () => {
        console.log('WebSocket connection closed');
      };
  
      socket.onerror = error => {
        console.error('WebSocket error:', error);
      };
    }
  
    return next(action);
  };

}
