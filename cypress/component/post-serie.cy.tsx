import PostSerie from "src/pages/utils/post-serie";

describe('test sur post serie',()=>{
    const backImg = `${process.env.PUBLIC_URL}/assets/images/photo.avif`;
    const seriePostUrl = `${process.env.PUBLIC_URL}/assets/images/twister.webp`;
    const serieInfo = {
        year : 2015,
        genre : "Drame, Thriller, Séries VF",
        country : "U.S.A.",
        time : "42 min",
        director : "Joshua Safran",
        title : "Quantico",
        description : "De jeunes recrues du FBI se battent de toutes leurs forces sur le camp d'entraînement de Quantico en Virginie, entre tests d'endurance physique, cours de tir, et maîtrise de l'art de l'enquête et de l'interrogatoire. Ils ont 50% de chances d'échouer et la compétition fait rage. 9 mois plus tard, l'un d'entre eux est suspecté d'avoir commis la plus grosse attaque terroriste sur le sol américain depuis le 11 Septembre 2001...",
        like : '80%',
        unlike : '20%',
        classUnlike : 'w-[20%]',
        classLike : 'w-[80%]'
    }
    it('tester le masque sur le composant',()=>{
        cy.mount(<PostSerie backImg={backImg} seriePostUrl={seriePostUrl} serieInfo={serieInfo}/>);
        cy.get('.div1')
            .should('have.css', 'mask-image')
            .and('include', `url("http://localhost:8080/assets/images/cover.svg")`)
    })
    it('tester l\'url de image1',()=>{
        cy.mount(<PostSerie backImg={backImg} seriePostUrl={seriePostUrl} serieInfo={serieInfo}/>);
        cy.get('.img1').should('have.attr','src',backImg);
    })
    it('tester le alt sur image 1',()=>{
        cy.mount(<PostSerie backImg={backImg} seriePostUrl={seriePostUrl} serieInfo={serieInfo}/>);
        cy.get('.img1').should('have.attr','alt','poster');
    })
    it('tester l\'url sur l\'image 2',()=>{
        cy.mount(<PostSerie backImg={backImg} seriePostUrl={seriePostUrl} serieInfo={serieInfo}/>);
        cy.get('.img2').should('have.attr','src',seriePostUrl)
    })
    it('tester le alt sur l\'image 2',()=>{
        cy.mount(<PostSerie backImg={backImg} seriePostUrl={seriePostUrl} serieInfo={serieInfo}/>);
        cy.get('.img2').should('have.attr','alt','twister')
    })
    it('tester le titre',()=>{
        cy.mount(<PostSerie backImg={backImg} seriePostUrl={seriePostUrl} serieInfo={serieInfo}/>);
        cy.get('h2').should('have.text',serieInfo.title)
    })
    it('tester l\'année sur le composant',()=>{
        cy.mount(<PostSerie backImg={backImg} seriePostUrl={seriePostUrl} serieInfo={serieInfo}/>);
        cy.get('.div3').should('contain','Année: '+serieInfo.year)
    })
    it('tester le genre sur le composant',()=>{
        cy.mount(<PostSerie backImg={backImg} seriePostUrl={seriePostUrl} serieInfo={serieInfo}/>);
        cy.get('.div4').should('contain','Genre: '+serieInfo.genre)
    })
    it('tester le pays sur le composant',()=>{
        cy.mount(<PostSerie backImg={backImg} seriePostUrl={seriePostUrl} serieInfo={serieInfo}/>);
        cy.get('.div5').should('contain','Pays: '+serieInfo.country)
    })
    it('tester le temps sur le composant',()=>{
        cy.mount(<PostSerie backImg={backImg} seriePostUrl={seriePostUrl} serieInfo={serieInfo}/>);
        cy.get('.div6').should('contain','Temps: '+serieInfo.time)
    })
    it('tester le Réalisateur sur le composant',()=>{
        cy.mount(<PostSerie backImg={backImg} seriePostUrl={seriePostUrl} serieInfo={serieInfo}/>);
        cy.get('.div7').should('contain','Réalisateur: '+serieInfo.director)
    })
    it('tester le like css sur le composant',()=>{
        cy.mount(<PostSerie backImg={backImg} seriePostUrl={seriePostUrl} serieInfo={serieInfo}/>);
        cy.get('.left').should('have.class',`${serieInfo.classLike}`)
    })
    it('tester le unlike css sur le composant',()=>{
        cy.mount(<PostSerie backImg={backImg} seriePostUrl={seriePostUrl} serieInfo={serieInfo}/>);
        cy.get('.right').should('have.class',`${serieInfo.classUnlike}`)
    })
    it('tester le like sur le composant',()=>{
        cy.mount(<PostSerie backImg={backImg} seriePostUrl={seriePostUrl} serieInfo={serieInfo}/>);
        cy.get('.like').should('contain',`${serieInfo.like}`)
    })
    it('tester le unlike css sur le composant',()=>{
        cy.mount(<PostSerie backImg={backImg} seriePostUrl={seriePostUrl} serieInfo={serieInfo}/>);
        cy.get('.unlike').should('contain',`${serieInfo.unlike}`)
    })
    it('tester la description sur le composant',()=>{
        cy.mount(<PostSerie backImg={backImg} seriePostUrl={seriePostUrl} serieInfo={serieInfo}/>);
        cy.get('p').should('contain',`${serieInfo.description}`)
    })
})