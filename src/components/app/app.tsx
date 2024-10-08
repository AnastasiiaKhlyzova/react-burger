import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';

function App() {
  
return (
    <div className={styles.wrapper}>
      <AppHeader />
      <div className={styles.headerWrapper}>
      </div>
      <main>
        <h1 className={`text text_type_main-large mb-5 mt-8`}>Соберите бургер</h1>
        <div className={`${styles.content} mt-20`}>
          <BurgerIngredients className={styles.BurgerIngredients}  />
          <BurgerConstructor className={styles.BurgerConstructor}  />
        </div>
      </main>
    </div>
  );
}

export default App;
