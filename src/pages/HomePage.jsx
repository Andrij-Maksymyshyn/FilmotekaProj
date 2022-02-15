import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { fetchTrendCollection } from '../fetchApi/fetchApi';
import Loader from '../components/Loader';
import { Main } from './HomePage.styled';


export function HomePage() {
    const [movies, setMovies] = useState([]);
    const [errorM, setErrorM] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    

    
    useEffect(() => {
        setLoading(true);
        
        fetchTrendCollection().then(data => {
            const { data: { results } } = data;
            setMovies(results);
        })
            
            .catch(error => {
                setErrorM(error)
            })
            
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }); 

    }, []);


    return (
        <Main>
             {loading && <Loader/>}
            <h1>Trending today</h1>
            <ul>
                {movies.map(({id, title, name}) => (
                    <li key={id}><Link to={`/movies/${id}`} state={{ from: location }}>{title ? title : name}</Link></li>
                ))}
            </ul>
            {errorM && <h2>Whoops, something went wrong: error.</h2>}
            </Main>
    )
};