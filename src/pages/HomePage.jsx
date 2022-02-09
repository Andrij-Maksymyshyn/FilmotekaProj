import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { fetchTrendCollection } from '../fetchApi/fetchApi';
import Loader from '../components/Loader';
import { Main } from './HomePage.styled';


export function HomePage() {
    const [movies, setMovies] = useState([]);
    const [errorM, setErrorM] = useState(null);
    const [loading, setLoading] = useState(false);
    

    
    useEffect(() => {
        setLoading(true);
        try {
            fetchTrendCollection().then(data => {
                const { data: { results } } = data;
                setMovies(results);
            });
        } catch (error) {
            setErrorM(error);
         } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    }, []);


    return (
        <Main>
             {loading && <Loader/>}
            <h1>Popular movies list</h1>
            <ul>
                {movies.map(({id, title, name}) => (
                    <li key={id}><Link to={`/movies/${id}`}>{title ? title : name}</Link></li>
                ))}
            </ul>
            {errorM && <h2>Whoops, something went wrong: error.</h2>}
            </Main>
    )
};