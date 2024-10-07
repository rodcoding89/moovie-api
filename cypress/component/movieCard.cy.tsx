import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import FilmDetail from "src/pages/film/film-detail";
import SerieDetail from "src/pages/serie/serie-detail";
import MovieCard from "src/pages/utils/movie-card"

describe('test sur movie card',()=>{
    const cardData = 'assets/images/twister.webp';
    it('tester l\'url de l\'image',()=>{
        cy.mount(<BrowserRouter><MovieCard cardData={cardData} link="film/1"/></BrowserRouter>);
        cy.get('img').should('have.attr','src',"/"+cardData);
    })
    it('tester le alt',()=>{
        cy.mount(<BrowserRouter><MovieCard cardData={cardData} link="film/1"/></BrowserRouter>);
        cy.get('img').should('have.attr','alt','movie');
    })
    it("Tester si le clique sur le lien declanche la navigation vers le film",()=>{
        cy.mount(<MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<MovieCard cardData={cardData} link="film/1" />} />
              <Route path="/film/1" element={<FilmDetail/>} />
            </Routes>
          </MemoryRouter>);
        cy.get('a').click();
        cy.contains('Service de streaming pour ce film').should('be.visible')
    })
    it("Tester si le clique sur le lien declanche la navigation vers la serie",()=>{
        cy.mount(<MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<MovieCard cardData={cardData} link="serie/1" />} />
              <Route path="/serie/1" element={<SerieDetail/>} />
            </Routes>
          </MemoryRouter>);
        cy.get('a').click();
        cy.contains('Regarder un extrait de la serie').should('be.visible')
    })
})