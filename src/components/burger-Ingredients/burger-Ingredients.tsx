import React, { useState } from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItem from './ingredient-item/ingredient-item';
import styles from './burger-ingredients.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';


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
   className?: string;
}

const BurgerIngredients: React.FC<Props> = ({ ingredients, className  }) => {
    const [current, setCurrent] = React.useState('Булки');
    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null); 
    const [isModalOpen, setModalOpen] = useState(false);

    const handleIngredientClick = (ingredient: Ingredient) => {
        setSelectedIngredient(ingredient);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedIngredient(null);
    };

       return (
        <section className={`${className} ${styles.container}`}>
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

            <div className={`${styles.ingredientsContainer}`}>
                <h2 className="text text_type_main-medium pt-5 pb-5">Булки</h2>
                <div className={styles.ingredientsList}>
                    {ingredients
                        .filter(item => item.type === 'bun')
                        .map(item => (
                            <div onClick={() => handleIngredientClick(item)} key={item._id}>
                                <IngredientItem item={item} />
                            </div>
                        ))}
                </div>
                <h2 className="text text_type_main-medium pt-5 pb-5">Соусы</h2>
                <div className={styles.ingredientsList}>
                    {ingredients
                        .filter(item => item.type === 'sauce')
                        .map(item => (
                            <div onClick={() => handleIngredientClick(item)} key={item._id}>
                                <IngredientItem item={item} />
                            </div>
                        ))}
                </div>

                <h2 className="text text_type_main-medium pt-5 pb-5">Начинки</h2>
                <div className={styles.ingredientsList}>
                    {ingredients
                        .filter(item => item.type === 'main')
                        .map(item => (
                            <div onClick={() => handleIngredientClick(item)} key={item._id}>
                                <IngredientItem item={item} />
                            </div>
                        ))}
                </div>
            </div>
            {isModalOpen && selectedIngredient && (
                <Modal title="Детали ингредиента" onClose={closeModal}>
                    <IngredientDetails ingredient={selectedIngredient} />
                </Modal>
            )}
        </section>
    );
};

export default BurgerIngredients;