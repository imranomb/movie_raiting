import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import { Movies } from './pages/Movies';
import Add from './pages/Add';

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Movies/>}/>
          <Route path='/add' element={<Add/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
