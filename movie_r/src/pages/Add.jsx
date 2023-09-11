import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const Add = () => {
  const [movie, setMovie] = React.useState({
    cover: "",
    name: "",
    genre: "",
    raiting: null
  })  

  const navigate = useNavigate();

  function handleChange(e)
  {
    setMovie((prev) => ({...prev, [e.target.name]: e.target.value}))
  }
  const handleClick = async e => {
    e.preventDefault();
    try 
    {
        await axios.post("http://localhost:8080/add", movie);
        navigate("/");
    }catch(err)
    {
        console.log(err)
    }
  }
  return (
    <form>
        <button onClick={() => navigate("/")}>BACK</button>
        <input type='text' placeholder='cover' onChange={handleChange} name='cover'/>
        <input type='text' placeholder='name' onChange={handleChange} name='name'/>
        <input type='text' placeholder='genre' onChange={handleChange} name='genre'/>
        <input type='number' placeholder='raiting' onChange={handleChange} name='raiting'/>
        <button onClick={handleClick}>Add</button>
    </form>
  )
}

export default Add