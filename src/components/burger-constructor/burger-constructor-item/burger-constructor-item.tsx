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
        <div >
            <div className={`pb-4 ${styles.itemContainer}`}>
                <div className={`mr-2 ${styles.dragIconContainer}`}>
                    {!isLocked && <DragIcon type="primary" />} 
                </div>
                <div className={`pl-4 pr-4 pt-4 pb-4 ${styles.item}`}>
                    <img className={`${styles.image} mr-4`} src={item.image} alt={item.name} />
                    <div className={`${styles.details} mr-4`}> 
                        <span className="text text_type_main-default">{item.name}</span>
                    </div>

                    <div className={`${styles.price} mr-4`}>
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
        </div>
    );
};

export default BurgerConstructorItem;



