import React, { useEffect, useState } from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItem from './ingredient-item/ingredient-item';
import styles from './burger-ingredients.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { RootState } from '../../services/store';
import { Ingredient } from '../../utils/types';
import { fetchIngredients } from '../../services/ingredients-slice';
import { setCurrentIngredient, clearCurrentIngredient } from '../../services/current-ingredient-slice'; 

interface Props {
  
   className?: string;
}

const BurgerIngredients: React.FC<Props> = ({  className  }) => {
    const [current, setCurrent] = React.useState('Булки');
    const [isModalOpen, setModalOpen] = useState(false);

    const dispatch = useDispatch<AppDispatch>()
    const { ingredients, status, error } = useSelector((state: RootState) => state.ingredients);
    const currentIngredient = useSelector((state: RootState) => state.currentIngredient.currentIngredient);

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    const handleIngredientClick = (ingredient: Ingredient) => {
        dispatch(setCurrentIngredient(ingredient));
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        dispatch(clearCurrentIngredient());
        
    };

    if (status === 'loading') {
        return <p>Загрузка ингредиентов...</p>;
    }

    if (status === 'failed') {
        return <p>Ошибка: {error}</p>;
    }

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
            {isModalOpen && currentIngredient && (
                <Modal title="Детали ингредиента" onClose={closeModal}>
                    <IngredientDetails ingredient={currentIngredient} />
                </Modal>
            )}
        </section>
    );
};

export default BurgerIngredients;