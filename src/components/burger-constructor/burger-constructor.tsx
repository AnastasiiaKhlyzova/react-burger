import React, { useState } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import Modal from '../modal/modal'; 
import OrderDetails from '../order-details/order-details';
import { Ingredient } from '../../utils/types';

interface Props {
    ingredients: Ingredient[];
    className?: string;
}

const BurgerConstructor: React.FC<Props> = ({ ingredients, className }) => {
     
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const bun = ingredients.find(item => item.type === 'bun');
    const filterIngredients = ingredients.filter(item => item.type !== 'bun');
    const totalPrice = (bun ? bun.price * 2 : 0) + filterIngredients.reduce((acc, item) => acc + item.price, 0);
    
    return (
        <section className={`${className} ${styles.constructorContainer}`}>
        {bun && <BurgerConstructorItem item={bun} isLocked={true} type="top"  className='ml-6 mb-4'/>} 
        
        <div className={styles.ingredientsContainer}>
            {filterIngredients.map((item, index) => (
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
