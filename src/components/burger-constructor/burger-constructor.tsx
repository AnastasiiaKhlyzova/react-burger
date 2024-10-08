import React, { useState } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import Modal from '../modal/modal'; 
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import { setOrder, clearOrder } from '../../services/order-slice';


interface Props {
  
    className?: string;
}

const BurgerConstructor: React.FC<Props> = ({ className }) => {
     
    const [isModalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const { bun, burgerIngredients} = useSelector((state:RootState) => state.burgerConstructor)

    const handleOpenModal = () => {
        const order = {
          id: '444', 
          status: 'готовится',
        };
        dispatch(setOrder(order)); 
        setModalOpen(true); 
      };
    
      const handleCloseModal = () => {
        setModalOpen(false);
        dispatch(clearOrder()); 
      };

    const totalPrice = (bun ? bun.price * 2 : 0) + burgerIngredients.reduce((acc, item) => acc + item.price, 0);
    
    return (
        <section className={`${className} ${styles.constructorContainer}`}>
        {bun && <BurgerConstructorItem item={bun} isLocked={true} type="top"  className='ml-6 mb-4'/>} 
        
        <div className={styles.ingredientsContainer}>
            {burgerIngredients.map((item, index) => (
                <BurgerConstructorItem key={item._id + index} item={item} />
            ))}
        </div>
        
        {bun && <BurgerConstructorItem item={bun} isLocked={true} type="bottom"  className='ml-6 mt-4' />} 
    
        <div className={`${styles.footer} pt-4 pb-4`}>
            <div className={styles.totalPrice}>
                <span className="text text_type_digits-medium">{totalPrice}</span>
                <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="medium" htmlType="button" onClick={handleOpenModal}>
                Оформить заказ
            </Button>
        </div>
    
        {isModalOpen && (
            <Modal onClose={handleCloseModal}>
                <OrderDetails /> 
            </Modal>
        )}
    </section>
    );
};

export default BurgerConstructor;
