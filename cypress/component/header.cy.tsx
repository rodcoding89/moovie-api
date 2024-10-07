import { BrowserRouter } from "react-router-dom";
import Header from "src/pages/header"

describe("test sur le header",()=>{
    it("tester si lorsque je clique sur le lien , la classe idown est ajouté",()=>{
        cy.mount(<BrowserRouter><Header/></BrowserRouter>);
        cy.get('.div1').click();
        cy.get('.div1').should('have.class','idown')
    })
    it("tester si lorsque je clique sur le lien , la classe idown est retiré",()=>{
        cy.mount(<BrowserRouter><Header/></BrowserRouter>);
        cy.get('.div1').click();
        cy.get('.div1').click();
        cy.get('.div1').should('not.have.class','idown')
    })
    it("tester si lorsque je clique sur le lien , la classe idown est ajouté",()=>{
        cy.mount(<BrowserRouter><Header/></BrowserRouter>);
        cy.get('.div2').click();
        cy.get('.div2').should('have.class','idown')
    })
    it("tester si lorsque je clique sur le lien , la classe idown est retiré",()=>{
        cy.mount(<BrowserRouter><Header/></BrowserRouter>);
        cy.get('.div2').click();
        cy.get('.div2').click();
        cy.get('.div2').should('not.have.class','idown')
    })
})