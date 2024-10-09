import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BurgerConstructorState, Ingredient } from '../utils/types';
import { nanoid } from 'nanoid';


const initialState: BurgerConstructorState = {
    bun: null,
    burgerIngredients: [],
  };

const BurgerConstructorSlice = createSlice({
  name: 'burger-constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload; 
    } else {
       state.burgerIngredients.push({ ...action.payload, uniqueId: nanoid() });
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
        state.burgerIngredients = state.burgerIngredients.filter(
          ingredient => ingredient.uniqueId !== action.payload
        );
      },
    clearConstructor: (state) => {
      state.bun = null;
      state.burgerIngredients = [];
    },
  },
});
export const { addIngredient, removeIngredient } = BurgerConstructorSlice.actions;
export default BurgerConstructorSlice.reducer;
