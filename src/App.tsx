import Header from './pages/header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import FilmDetail from './pages/film/film-detail';
import FilmList from './pages/film/film-list';
import SerieDetail from './pages/serie/serie-detail';
import SerieList from './pages/serie/serie-list';
import Season from './pages/serie/season';
import Episode from './pages/serie/episode';
function App() {
  return (
    <div className='content relative'>
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/serie/:id' element={<SerieDetail/>}></Route>
          <Route path='/serie/:id/season/:season_id' element={<Season/>}></Route>
          <Route path='/serie/:id/season/:season_id/episode/:ep_id' element={<Episode/>}></Route>
          <Route path='/serie/:name/:id' element={<SerieList/>}></Route>
          <Route path='/film/:id' element={<FilmDetail/>}></Route>
          <Route path='/film/:name/:id' element={<FilmList/>}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
