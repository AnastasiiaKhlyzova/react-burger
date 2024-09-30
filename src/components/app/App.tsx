import React from 'react';
import useFetch from '../../hooks/useFetch';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './App.module.css'



function App() {
  
  const { data, loading, error } = useFetch();

    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>Ошибка: {error}</p>;
    }

    return (
      <div className={styles.wrapper}>
        <AppHeader />
        <div className={styles.headerWrapper}>
        </div>
        <div>
          <h1 className={`text text_type_main-large mb-5 mt-8`}>Соберите бургер</h1>
          <div className={`${styles.content} mt-20`}>
            <BurgerIngredients className={styles.BurgerIngredients} ingredients={data} />
            <BurgerConstructor className={styles.BurgerConstructor} ingredients={data} />
          </div>
        </div>
       
      </div>
    );
  }
export default App;