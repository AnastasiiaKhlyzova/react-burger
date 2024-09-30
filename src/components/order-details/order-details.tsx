import React from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'; 
import styles from './order-details.module.css'; 
const OrderDetails: React.FC = () => {

  const orderNumber = '034536';

  return (
    <div className={styles.container}>
    
      <p className="text text_type_digits-large">{orderNumber}</p>
      <p className="text text_type_main-medium pt-8">идентификатор заказа</p>

      <div className={`${styles.icon} pt-15 pb-15`}>
        <CheckMarkIcon type="primary" />
      </div>
        <p className="text text_type_main-default pb-2">
        Ваш заказ начали готовить
        </p>
      <p className="text text_type_main-default text_color_inactive mb-8">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
