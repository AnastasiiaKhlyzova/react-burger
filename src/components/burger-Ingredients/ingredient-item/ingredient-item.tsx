import React from 'react';
import styles from './ingredient-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

interface IngredientItemProps {
    item: {
        _id: string
        name: string
        image: string
        price: number
        __v: number;
    }
}
const IngredientItem: React.FC<IngredientItemProps> = ({item}) => {
    return (
        <div className={`${styles.item} pl-4 pr-4 mb-8`}>
            <Counter  count={item.__v} size='default'/>
                <img className={`${styles.image}`} src={item.image} alt={item.name} />
                    <div className={`${styles.price} mt=1 mb=1`}>
                        <span className="text text_type_digits-default">{item.price}</span>
                        <CurrencyIcon type='primary' />
                     </div>
                <span className={`${styles.name} text text_type_main-default`}>
                {item.name}
                </span>
        </div>
    )}

export default IngredientItem