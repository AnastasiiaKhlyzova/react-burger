import React from 'react';
import { DragIcon, CurrencyIcon, DeleteIcon, LockIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-item.module.css';

interface BurgerConstructorItemProps {
    item: {
        _id: string;
        name: string;
        type: string;
        price: number;
        image: string;
    };
    isLocked?: boolean; 
}

const BurgerConstructorItem: React.FC<BurgerConstructorItemProps> = ({ item, isLocked }) => {
    return (
        <div className="mb-4"> 
            <div className={`pl-4 pr-4 pt-4 pb-4 ${styles.item}`}> 
                {!isLocked && <DragIcon type="primary" />}
                <img className={styles.image} src={item.image} alt={item.name} />
                <div className={`${styles.details} ml-4`}> 
                    <span className="text text_type_main-default">{item.name}</span>
                </div>
                <div className={styles.price}>
                    <span className="text text_type_digits-default">{item.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                {isLocked ? (
                    <LockIcon type="secondary" />
                ) : (
                    <DeleteIcon type="primary" />
                )}
            </div>
        </div>
    );
};

export default BurgerConstructorItem;


