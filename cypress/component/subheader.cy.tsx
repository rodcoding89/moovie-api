import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import FilmList from "src/pages/film/film-list";
import SerieList from "src/pages/serie/serie-list";
import Subheader from "src/pages/subheader";

describe("test sur le composant subheader",()=>{
    const type = "film";
    const categorie = ["Sci Fi"];
    const explore = [{name:"Films à venir",id:"upcoming"}];
    const display = "block";
    function shareData(data:any){
        console.log('mydata ',data)
    }
    it("tester si le format du lien est contien upcoming dans explore",()=>{
        cy.mount(<BrowserRouter><Subheader type={type} categorie={categorie} explore={explore} display={display} shareData={shareData}/></BrowserRouter>);
        cy.get('.a1').should('have.attr','href','/'+type.toLowerCase()+'/explore/'+explore[0].id)
    })
    it("tester si le format du lien est correct avec catégorie",()=>{
        cy.mount(<BrowserRouter><Subheader type="serie" categorie={categorie} explore={explore} display={display} shareData={shareData}/></BrowserRouter>);
        cy.get('.a2').should('have.attr','href','/'+"Serie".toLowerCase()+'/'+categorie[0].replaceAll(' ','-').toLowerCase()+'/1')
    })
    it("tester le nom du lien dans explore",()=>{
        cy.mount(<BrowserRouter><Subheader type="serie" categorie={categorie} explore={explore} display={display} shareData={shareData}/></BrowserRouter>);
        cy.get('.a1').should('have.text',explore[0].name)
    })
    it("tester la redirection lors du clique d'un lien sur explore",()=>{
        cy.mount(<MemoryRouter>
            <Routes>
                <Route path="/" element={<Subheader type={type} categorie={categorie} explore={explore} display={display} shareData={shareData}/>}/>
                <Route path="/film/explore/upcoming" element={<FilmList/>}/>
            </Routes>
        </MemoryRouter>);
        cy.get('.a1').click();
        cy.get('h4').contains('Empire records').should('be.visible');
    })
    it("tester la redirection lors du clique d'un lien sur explore",()=>{
        cy.mount(<MemoryRouter>
            <Routes>
                <Route path="/" element={<Subheader type='serie' categorie={categorie} explore={explore} display={display} shareData={shareData}/>}/>
                <Route path="/serie/sci-fi/1" element={<SerieList/>}/>
            </Routes>
        </MemoryRouter>);
        cy.get('.a2').click();
        cy.get('h4').contains('Empire records').should('be.visible');
    })
})