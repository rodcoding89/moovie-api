import Teaser from "src/pages/utils/teaser";

describe('test sur le composant teaser',()=>{
    const teaserImg = process.env.PUBLIC_URL+'/assets/images/genre-film.avif';
    const description = "Bienvenue au bord de votre siège, car il est temps de plonger dans l'action. Des westerns classiques et films de guerre aux aventures de héros d'action modernes.";
    const cat = 'action'
    it("tester la src de l'image sur le composant",()=>{
        cy.mount(<Teaser teaserImg={teaserImg} description={description} cat={cat}/>);
        cy.get('img').should('have.attr','src',teaserImg);
    })
    it("tester la alt de l'image sur le composant",()=>{
        cy.mount(<Teaser teaserImg={teaserImg} description={description} cat={cat}/>);
        cy.get('img').should('have.attr','alt',cat);
    })
    it("tester la categorie du film ou serie",()=>{
        cy.mount(<Teaser teaserImg={teaserImg} description={description} cat={cat}/>);
        cy.get('h1').should('have.text',cat);
    })
    it("tester la description du film ou serie",()=>{
        cy.mount(<Teaser teaserImg={teaserImg} description={description} cat={cat}/>);
        cy.get('p').should('have.text',description);
    })
})