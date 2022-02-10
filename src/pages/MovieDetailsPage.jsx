import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieById } from '../fetchApi/fetchApi';
import { Toaster, toast } from 'react-hot-toast';
import Loader from '../components/Loader';
import { Main, Box, Div1, Div2, Img } from './MovieDetailsPage.styled';

const noPosterImg = 'https://sd.keepcalms.com/i/sorry-no-picture-available-2.png';

export function MovieDetailsPage() {
    const { moviesId } = useParams();
    const [movie, setMovie] = useState(null);
    // const [errorM, setErrorM] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
               setLoading(true);

        try {
            fetchMovieById(moviesId).then(data => {
                const { data: { poster_path, title, name, overview, vote_average, genres } } = data;
                if (!overview) {
                return toast.error('Sorry, there is no film. Try another request...');
                };
                                 
                setMovie({
                    poster: poster_path ? ('https://image.tmdb.org/t/p/w500' + poster_path) : noPosterImg,
                    title,
                    name,
                    overview,
                    vote_average,
                    genresValues: (genres.length === 0) ?
                        "There are no genres" : 
                        (genres.map(({ name }) => (
                        [name]
                        )).join(", "))
                        });              

            })      

        }
        catch (error) {
            // setErrorM(error);
            console.log('OOOps EEEEEEEError');
            throw error;
            
            
        }
        finally {
           
      setTimeout(() => {
          setLoading(false);           
      }, 1000);
        } 
        
    }, [moviesId]);    
   
    
   

    return (
        
        <Main>
            
            <Toaster position="top-right" />
            {loading && <Loader/>}
                
            {movie && (
                <Box>
                    <Div1>
                        <Img src={movie.poster} alt={movie.title ? movie.title : movie.name} />
                    </Div1>
                    <Div2>
                    <h1>{movie.title ? movie.title : movie.name}</h1>
                    <p>User Score: {movie.vote_average * 10}%</p>
                    <h2>Overview</h2>
                    <p>{movie.overview}</p>
                    <h3>Genres</h3>
                    <p>{movie.genresValues}</p>
                    </Div2>      
                </Box>                    
                )}              
                                
            {/* {errorM && <h2>Whoops, something went wrong: error.</h2>} */}
        </Main>
    )
};