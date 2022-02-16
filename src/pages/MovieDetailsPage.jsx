import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, Outlet } from "react-router-dom";
import { fetchMovieById } from '../fetchApi/fetchApi';
import { Toaster, toast } from 'react-hot-toast';
import Loader from '../components/Loader';
import { Main, Box, Div1, Div2, Img, LinkStyled, Button, LinkStyledAddIn } from './MovieDetailsPage.styled';
import { FaArrowLeft } from 'react-icons/fa';


const noPosterImg = 'https://sd.keepcalms.com/i/sorry-no-picture-available-2.png';


export function MovieDetailsPage() {
    const { moviesId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const grandPath = useRef(location);

    
    useEffect(() => {

        setLoading(true);    
        
        fetchMovieById(moviesId).then(data => {
            const { data: { poster_path, title, name, overview, vote_average, genres } } = data;                
               
                                               
            setMovie({
                poster: poster_path ? ('https://image.tmdb.org/t/p/w500' + poster_path) : noPosterImg,
                title,
                name,
                overview: overview ? overview : "There is no overview",
                vote_average,
                genresValues: (genres.length === 0) ?
                    "There are no genres" :
                    (genres.map(({ name }) => (
                        [name]
                    )).join(", "))
            });

        })
            
            .catch(error => {
                console.log('Whoops, something went wrong...', error);
                return toast.error('There is no film. Try another request...');
            })

            .finally(() => setTimeout(() => {
                setLoading(false);
            }, 1000));       
        
    }, [moviesId]);
    
      

    return (
        
        <Main>
            
            <Toaster position="top-right" />
            {loading && <Loader />}
            
            <Button type="button"><LinkStyled to={grandPath.current?.state?.from ?? `/`} state={{ from: grandPath.current }}><FaArrowLeft />Go back</LinkStyled></Button>
                
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

            <hr />

            <h3>Additional information</h3>

             <ul>
          <li>
            <LinkStyledAddIn to={`/movies/${moviesId}/cast`} >
              Cast
            </LinkStyledAddIn>
          </li>
          <li>
            <LinkStyledAddIn to={`/movies/${moviesId}/reviews`} >
              Reviews
            </LinkStyledAddIn>
          </li>
            </ul>
            
            <hr/>            
            
            <Outlet/>
            
                                          
        </Main>
    )
};