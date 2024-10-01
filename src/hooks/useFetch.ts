import { useState, useEffect } from 'react';
import { Ingredient } from '../utils/types';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';


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