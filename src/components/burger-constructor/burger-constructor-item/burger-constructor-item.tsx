import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../../utils/types';
import styles from './burger-constructor-item.module.css';

interface BurgerConstructorItemProps {
    item: Ingredient;
    isLocked?: boolean;
    type?: 'top' | 'bottom'; 
    className?: string;
    handleRemove?: (id: string) => void;
}

const BurgerConstructorItem: React.FC<BurgerConstructorItemProps> = ({ item, isLocked, type, className, handleRemove }) => {
    const icon = type === 'top' || type === 'bottom' ? null : <DragIcon type="primary" />;
    const comment = type === 'top' ? '(верх)' : type === 'bottom' ? '(низ)' : '';

    const handleRemoveClick = () => {
        if (item.uniqueId) {
            handleRemove?.(item.uniqueId); 
        }
    };

    return (
        <div className={`${className} ${styles.constructorElement}`}>
            {icon}
            <ConstructorElement
                type={type}
                text={`${item.name} ${comment}`}
                price={item.price}
                thumbnail={item.image}
                isLocked={isLocked}
                handleClose={handleRemoveClick} 
            />
        </div>
    );
};

export default BurgerConstructorItem;
