import React from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItem from './ingredient-item/ingredient-item';
import styles from './burger-ingredients.module.css';


interface Ingredient {
   _id: string;
   name: string;
   type: 'bun' | 'sauce' | 'main';
   proteins: number;
   fat: number;
   carbohydrates: number;
   calories: number;
   price: number;
   image: string;
   image_mobile: string;
   image_large: string;
   __v: number;
}

interface Props {
   ingredients: Ingredient[];
}

const BurgerIngredients: React.FC<Props> = ({ ingredients }) => {
    const [current, setCurrent] = React.useState('Булки');

       return (
        <section className={`${styles.container} pt-5`}>
            <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
            <div className={styles.tabs}>
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <div className={styles.ingredientsContainer}>
                <h2 className="text text_type_main-medium pt-5 pb-2">Булки</h2>
                <div className={styles.ingredientsList}>
                    {ingredients
                        .filter(item => item.type === 'bun')
                        .map(item => (
                            <IngredientItem key={item._id} item={item} />
                        ))}
                </div>

                <h2 className="text text_type_main-medium pt-5 pb-2">Соусы</h2>
                <div className={styles.ingredientsList}>
                    {ingredients
                        .filter(item => item.type === 'sauce')
                        .map(item => (
                            <IngredientItem key={item._id} item={item} />
                        ))}
                </div>

                <h2 className="text text_type_main-medium pt-5 pb-2">Начинки</h2>
                <div className={styles.ingredientsList}>
                    {ingredients
                        .filter(item => item.type === 'main')
                        .map(item => (
                            <IngredientItem key={item._id} item={item} />
                        ))}
                </div>
            </div>
        </section>
    );
};

export default BurgerIngredients;