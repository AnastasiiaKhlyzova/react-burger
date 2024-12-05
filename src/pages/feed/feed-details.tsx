import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'clsx';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { RootState } from '../../services/store';
import { Ingredient } from '../../utils/types';
import OrderHistoryIngredientItem from '../../components/order-history-ingredient-item/order-history-ingredient-item';
import { getOrder } from '../../services/order-slice';
import styles from './feed-details.module.css';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

const FeedDetailsPage = ({ className }: { className?: string }) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const order = useAppSelector((state: RootState) => state.order.order);
  const ingredients = useAppSelector(
    (state: RootState) => state.ingredients.ingredients,
  );

  useEffect(() => {
    if (id) {
      dispatch(getOrder(id));
    }
  }, [id, dispatch]);

  if (!order) {
    return <div>Заказ не найден</div>;
  }

  const getIngredientDetails = (ingredientIds: string[]): Ingredient[] => {
    return ingredientIds
      .map((id) => ingredients.find((ingredient) => ingredient._id === id))
      .filter(Boolean) as Ingredient[];
  };

  const ingredientDetails = getIngredientDetails(order.ingredients);

  const totalPrice = ingredientDetails.reduce((total, ingredient) => {
    const quantity = order.ingredients.filter(
      (id: string) => id === ingredient._id,
    ).length;
    const isBun = ingredient.type === 'bun';
    return total + ingredient.price * (isBun ? 1 : quantity);
  }, 0);

  return (
    <div className={cn(styles.wrapper, className)}>
      <h1>#{order.number}</h1>
      <div className={styles.header}>
        <h2 className="text text_type_main-medium mb-2">{order.name}</h2>
      </div>
      <h3>Состав:</h3>
      <div className={styles.ingredients}>
        {ingredientDetails.map((ingredient: Ingredient) => (
          <OrderHistoryIngredientItem
            key={ingredient._id}
            image={ingredient.image}
            name={ingredient.name}
            quantity={
              ingredient.type === 'bun'
                ? 1
                : order.ingredients.filter(
                    (id: string) => id === ingredient._id,
                  ).length
            }
            price={ingredient.price}
          />
        ))}
      </div>
      <div className={styles.footer}>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(order.createdAt)}
        />
        <div className={styles.total}>
          <span className="text text_type_digits-default">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default FeedDetailsPage;
