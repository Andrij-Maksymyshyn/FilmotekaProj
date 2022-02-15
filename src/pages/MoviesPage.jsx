import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import Searchbar from '../components/Searchbar';
import { fetchMovieByKeyWord } from '../fetchApi/fetchApi';
import Loader from '../components/Loader';


export function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [errorM, setErrorM] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchFilmValue = searchParams.get('value');
  const location = useLocation();
    

     const addSearchValue = formData => {
     setSearchParams({value: formData})   
  };

    useEffect(() => {
         if (searchFilmValue === '') {
      return;
        };
        
      if (searchFilmValue) {
          
        setLoading(true);
        
        
        fetchMovieByKeyWord(searchFilmValue)
          .then(data => {
          const { data: { results } } = data;

          if (results.length === 0) {
            return toast.error('Sorry, there are no movies. Try another request...');
          };

          setMovies(results);
          })
          
          .catch(error => {
            setErrorM(error);
        
          })
          
          .finally(() => {
            setTimeout(() => {
              setLoading(false);
            }, 1000)
          });   
      }         
    }, [searchFilmValue]);

    return (
    <div>
      <Toaster position="top-right" />
            <Searchbar propSubmit={addSearchValue} />
        {loading && <Loader />}
            <ul>
                {movies.map(({id, title, name}) => (
                    <li key={id}><Link to={`${id}`} state={{ from: location }}>{title ? title : name}</Link></li>
                ))}
            </ul>
            {errorM && <h2>Whoops, something went wrong: error.</h2>}
    </div>
  );
};