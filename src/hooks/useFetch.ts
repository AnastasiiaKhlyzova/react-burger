import { useState, useEffect } from 'react';


const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

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
 const useFetch = () => {
    const [data, setData] = useState<Ingredient[]>([]);  
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                const result = await response.json();
                setData(result.data as Ingredient[]); 
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default useFetch