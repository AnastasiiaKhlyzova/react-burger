import { createSlice, PayloadAction, createAsyncThunk,  } from '@reduxjs/toolkit';
import { Ingredient, IngredientsState } from '../utils/types';
import { API_URL } from '../utils/constants';


const initialState: IngredientsState = {
    ingredients: [],
    status: 'idle',
    error: null,
  };

  export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch ingredients');
        }
        const data = await response.json();
        console.log('Fetched data:', data); 
        return data.data as Ingredient[]; 
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    }
  );
  
const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        setIngredients: (state, action: PayloadAction<Ingredient[]>) => {
            state.ingredients = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<Ingredient[]>) => {
                state.status = 'succeeded';
                state.ingredients = action.payload;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});
  
  export const { setIngredients } = ingredientsSlice.actions;
  export default ingredientsSlice.reducer;