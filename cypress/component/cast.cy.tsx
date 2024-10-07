import Cast from "src/pages/utils/cast"

describe('test sur le composant cast',()=>{
    const castData = {
        name:"Ariane Rinehart",
        actorName:"Eve",
        link:"assets/images/actor.avif"
    }
    it('test de l\'url de l\'image',()=>{
        cy.mount(<Cast castData={castData}/>)
        cy.get('img').should('have.attr','src','/'+castData.link)
    })
    it('test sur le nom',()=>{
        cy.mount(<Cast castData={castData}/>)
        cy.get('p').should('have.text',castData.name)
    })
    it('test nom acteur',()=>{
        cy.mount(<Cast castData={castData}/>)
        cy.get('span').should('have.text',castData.actorName);
    })
})