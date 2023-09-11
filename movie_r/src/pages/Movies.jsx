import React from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'

export const Movies = () => {

    const [movies, setMovies] = React.useState({});
    const [range, setRange] = React.useState(0);
    const [addState, addChange] = React.useState(false);
    const [loginState, loginChange] = React.useState({username: "", password: ""});
    const [nextState, nextChange] = React.useState(true);
    const [preState, preChange] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        if(loginState.password == "imran" && loginState.username == "imran")
        {
            addChange(true);
        }
        else 
        {
            addChange(false);
        }
    }, [loginState])
    React.useEffect(() => {
        const fetchMovies = async ()=> {
            try 
            {
                const res = await axios.get(`http://localhost:8080/movies?range=${range}`);
                setMovies(res.data)
                if(movies.filmCount && range >= movies.filmCount-2)
                {
                    nextChange(false);
                    setRange(movies.filmCount-2);
                }
                else nextChange(true);
                if(range <= 0) preChange(false);
                else 
                {
                    preChange(true);
                }
            }catch(err) 
            {
                console.log(err);
            }
        }
        fetchMovies();
    }, [range])
    async function movieDelete(id)
    {
        await axios.delete(`http://localhost:8080/delete/` + id);
        window.location.reload();
    }
    const moviesInfo = movies.items && movies.items.map(movie => (
        <div className="movie" key={movie.id}>
            {movie.cover && <img src={`../src/movies/${movie.cover}`} alt='movie_cover'/>}
            <h3>TITLE: {movie.name}</h3>
            <p>Genre: {movie.genre}</p>
            <span>Raiting: {movie.raiting}</span>
            <button className='delete' onClick={() => movieDelete(movie.id)}>Delete</button>
        </div>
    )) 
    function loginFunction()
    {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        loginChange({
            username: username,
            password: password
        })
    }
  return (
    <div>
        {
            addState?<button onClick={() => navigate("/add")}>ADD</button>:null
        }
        {
            addState?null:<div className="login">
            <input type='text' id='username' placeholder='username'/>
            <input type='password' id='password' placeholder='password'/>
            <button onClick={loginFunction}>Login</button>
        </div>
        }
        <h2>MOVIES I WATCEHD</h2>
        <div className="movies">
            {moviesInfo}
        </div>
        <div className="next_pre">
            {preState?<button onClick={() => setRange(prev => prev - 3)}>PREVIOUS</button>:null}
            {nextState?<button onClick={() => setRange(prev => prev + 3)}>NEXT</button>:null}
        </div>
    </div>
  )
}
