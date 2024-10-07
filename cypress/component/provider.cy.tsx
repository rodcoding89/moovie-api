import CardProvider from '../../src/pages/utils/card-provider';
describe('test sur le composant provider',()=>{
    it('tester si l\'image a une url',()=>{
        const cardData = 'assets/images/provider.webp';
        cy.mount(<CardProvider cardData={cardData}/>)
        cy.get('img').should('have.attr','src','/'+cardData);
    })
    it('test sur alt',()=>{
        const cardData = 'assets/images/provider.webp';
        cy.mount(<CardProvider cardData={cardData}/>)
        cy.get('img').should('have.attr','alt','provider');
    })
})