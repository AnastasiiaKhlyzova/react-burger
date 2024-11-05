export interface Ingredient {
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
    uniqueId?: string;
}

export interface IngredientsState {
    ingredients: Ingredient[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    currentIngredient?:  Ingredient | null;
  }
  
export interface BurgerConstructorState {
    bun: Ingredient | null; 
    burgerIngredients: Ingredient[]; 
  }

export interface CurrentIngredientState {
    currentIngredient: Ingredient | null;
  }


  export interface Order {
    number: number;
  }
  
export interface OrderState {
    order: Order | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

export interface OrderResponse {
    name: string;
    order: {
      number: number;
    };
    success: boolean;
  }
  
export interface ErrorResponse {
    message: string;
  }

  export interface User {
    email: string;
    name: string;
  }
  

  export interface UserResponse {
    success: boolean;
    user: User;
    accessToken: string;
    refreshToken: string;
  }
  
  export interface UserData {
    email: string;
    password: string;
    name?: string; 
  }
  
 
  