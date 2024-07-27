import React from 'react';
import Header from './pages/header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Categorie from './pages/categorie';
import Explore from './pages/explore';
import FilmDetail from './pages/film-detail';
function App() {
  return (
    <div className='content'>
      <Header/>
      <main className='relative'>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='categorie' element={<Categorie/>}></Route>
          <Route path='explore' element={<Explore/>}></Route>
          <Route path='film-detail' element={<FilmDetail/>}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
