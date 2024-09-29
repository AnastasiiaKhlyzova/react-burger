import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';

interface Ingredient {
    _id: string;
    name: string;
    type: 'bun' | 'sauce' | 'main';
    price: number;
    image: string;
}

interface Props {
    ingredients: Ingredient[];
}

const BurgerConstructor: React.FC<Props> = ({ ingredients }) => {
     
   
     const bun = ingredients.find(item => item.type === 'bun');
     const filterIngredients = ingredients.filter(item => item.type !== 'bun');
     const totalPrice = (bun ? bun.price * 2 : 0) + filterIngredients.reduce((acc, item) => acc + item.price, 0);
    
     return (
        <section className={`${styles.constructorContainer} pt-6 pb-6`}>
            <div className={styles.ingredientsContainer}>
                {bun && <BurgerConstructorItem item={bun} isLocked={true} />}
                {filterIngredients.map((item, index) => (
                    <BurgerConstructorItem key={item._id + index} item={item} />
                ))}
                {bun && <BurgerConstructorItem item={bun} isLocked={true} />}
            </div>
            <div className={`${styles.footer} pt-4 pb-4`}>
                <div className={styles.totalPrice}>
                    <span className="text text_type_digits-medium">{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="medium" htmlType="button">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
 };
 
 export default BurgerConstructor;