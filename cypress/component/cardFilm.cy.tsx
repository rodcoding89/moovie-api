import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom"
import FilmDetail from "src/pages/film/film-detail"
import CardFilm from "src/pages/utils/card-film"

describe('test sur card film',()=>{
    const cardData = {
        linkImg:'assets/images/the-acolyte.jpeg',
        linkImg1:"assets/images/the-acolyte.webp",
        name:"Star Wars : The Acolyte",
        rate:"3.9  (105k)",
        description:" Cent ans avant la naissance de l'Empire, l'Ordre Jedi et la République Galactique prospéraient depuis des siècles, sans la moindre guerre. Lors d'une enquête concernant un crime odieux, un Maître Jedi va devoir affronter un dangereux guerrier surgissant de son passé."
    }
    it('tester le premier lien de card film',()=>{
        cy.mount(<BrowserRouter><CardFilm cardData={cardData}/></BrowserRouter>)
        cy.get('.first-link').should('have.attr','src','/'+cardData.linkImg)
    })
    it('tester le alt sur l\'image 1',()=>{
        cy.mount(<BrowserRouter><CardFilm cardData={cardData}/></BrowserRouter>)
        cy.get('.first-link').should('have.attr','alt',cardData.name)
    })
    it('tester le deuxième lien de card film',()=>{
        cy.mount(<BrowserRouter><CardFilm cardData={cardData}/></BrowserRouter>)
        cy.get('.second-link').should('have.attr','src','/'+cardData.linkImg1)
    })
    it('tester le alt sur l\'image 2',()=>{
        cy.mount(<BrowserRouter><CardFilm cardData={cardData}/></BrowserRouter>)
        cy.get('.second-link').should('have.attr','alt',cardData.name)
    })
    it('tester le name',()=>{
        cy.mount(<BrowserRouter><CardFilm cardData={cardData}/></BrowserRouter>)
        cy.get('h3').should('have.text',cardData.name)
    })
    it('tester le rate',()=>{
        cy.mount(<BrowserRouter><CardFilm cardData={cardData}/></BrowserRouter>)
        cy.get('span').should('have.text',cardData.rate)
    })
    it('tester la description',()=>{
        cy.mount(<BrowserRouter><CardFilm cardData={cardData}/></BrowserRouter>)
        cy.get('p').should('have.text',cardData.description)
    })
    it("tester si lorsque je clique sur le lien, je suis redirigé vers le film",()=>{
        cy.mount(<MemoryRouter>
            <Routes>
                <Route path="/" element={<CardFilm cardData={cardData}/>}/>
                <Route path="/film/1" element={<FilmDetail/>}/>
            </Routes>
        </MemoryRouter>)
        cy.get('a').click();
        cy.contains('Service de streaming pour ce film').should('be.visible')
    })
})