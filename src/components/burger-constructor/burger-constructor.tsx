import React, { useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import Modal from '../modal/modal'; 
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import { setOrder, clearOrder } from '../../services/order-slice';
import { Ingredient } from '../../utils/types';
import { addIngredient, removeIngredient } from '../../services/burger-constructor-slice';
import { decrementIngredientCount } from '../../services/ingredients-slice';

interface Props {
  className?: string;
}

const BurgerConstructor: React.FC<Props> = ({ className }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const { bun, burgerIngredients } = useSelector((state: RootState) => state.burgerConstructor);

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: 'ingredient',
        drop: (item: Ingredient) => {
            dispatch(addIngredient(item)); 
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }));

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

    const handleRemoveIngredient = (uniqueId: string | undefined, _id: string) => {
        if (uniqueId) {
            dispatch(removeIngredient(uniqueId)); 
            dispatch(decrementIngredientCount(_id)); 
        }
    };

    const totalPrice = useMemo(() => (bun ? bun.price * 2 : 0) + burgerIngredients.reduce((acc, item) => acc + item.price, 0), [bun, burgerIngredients]);

    return (
        <section ref={dropRef} className={`${className} ${styles.constructorContainer} ${isOver ? styles.isOver : ''}`}>
            {bun && <BurgerConstructorItem item={bun} isLocked={true} type="top" className='ml-6 mb-4' />}
            
            <div className={styles.ingredientsContainer}>
                {burgerIngredients.map((item, index) => (
                    <BurgerConstructorItem
                        key={item.uniqueId}
                        item={item}
                        handleRemove={() => handleRemoveIngredient(item.uniqueId, item._id)} // Удаление ингредиента
                    />
                ))}
            </div>

            {bun && <BurgerConstructorItem item={bun} isLocked={true} type="bottom" className='ml-6 mt-4' />}

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
