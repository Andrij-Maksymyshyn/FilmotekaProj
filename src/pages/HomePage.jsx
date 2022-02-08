import { useState, useEffect } from 'react';
import { fetchTrendCollection } from '../fetchApi/fetchApi';
// import { Toaster, toast } from 'react-hot-toast';

export function HomePage() {
    const [movies, setMovies] = useState([]);
    const [errorM, setErrorM] = useState(null);

    
    useEffect(() => {
        try {
            fetchTrendCollection().then(data => {
                const { data: { results } } = data;
                setMovies(results);
            });
        } catch (error) {
            setErrorM(error);
         }
    }, []);


    return (
        <main>
            <h1>PopularMoviesList</h1>
            <ul>
                {movies.map(({id, title, name}) => (
                    <li key={id}>{title ? title : name}</li>
                ))}
            </ul>
            {errorM && <h2>Whoops, something went wrong: error.</h2>}
            </main>
    )
};