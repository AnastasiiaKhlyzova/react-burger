import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../../utils/types';


interface BurgerConstructorItemProps {
    item: Ingredient;
    isLocked?: boolean;
    type?: 'top' | 'bottom'; 
    className?: string;
}

const BurgerConstructorItem: React.FC<BurgerConstructorItemProps> = ({ item, isLocked, type, className }) => {
    const icon = type === 'top' || type === 'bottom' ? null : <DragIcon type="primary" />;
    const comment = type === 'top' ? '(верх)' : type === 'bottom' ? '(низ)' : '';

    return (
        <div className={className}>
            {icon} 
            <ConstructorElement
                type={type} 
                text={`${item.name} ${comment}`}
                price={item.price}
                thumbnail={item.image}
                isLocked={isLocked} 
            />
        </div>
    );
};

export default BurgerConstructorItem;



