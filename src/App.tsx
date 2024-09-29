import React from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-Ingredients/burger-Ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import useFetch from './hooks/useFetch';



function App() {
  
  const { data, loading, error } = useFetch();

    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>Ошибка: {error}</p>;
    }

  return (
    <div className="wrapper">
      <AppHeader />
      <div className="content mt-20">
      <div className="BurgerIngredients pr-5">
          <BurgerIngredients ingredients={data}/>
        </div>
        <div className="BurgerConstructor pl-5">
          <BurgerConstructor ingredients={data}/>
        </div>
      </div>
    </div>
  );
}

export default App;
