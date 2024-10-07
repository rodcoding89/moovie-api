import Poster from "src/pages/utils/poster";

describe('test sur le composant poster',()=>{
    const mask = process.env.PUBLIC_URL+'/assets/images/cover.svg';
    const poster = process.env.PUBLIC_URL+'/assets/images/photo.avif';
    const info = {
        name : "Noé",
      year : "2014 2h 18min TP",
      director : "Directed by Darren Aronofsky",
      genre : "Drame, Action et Adventure",
      rate : 5.8,
      country : "U.S.A",
      shortDes : "Noé, un père de famille, reçoit un message de Dieu au cours d’un rêve : la Terre s’apprête à subir un déluge apocalyptique, car l’homme a corrompu le monde à force de violence et d’avidité. Il part alors avec sa femme et ses enfants sur le mont Ararat et entreprend la.",
      description : "Noé, un père de famille, reçoit un message de Dieu au cours d’un rêve : la Terre s’apprête à subir un déluge apocalyptique, car l’homme a corrompu le monde à force de violence et d’avidité. Il part alors avec sa femme et ses enfants sur le mont Ararat et entreprend la construction d’une arche monumentale pour mettre à l’abri toutes les espèces existantes de l’humanité, sauver les innocents et préserver la vie sur Terre. Il accomplit ainsi son destin hors du commun. Mais il se heurte à un seigneur de la guerre qui cherche à régner sur ce monde dévasté, et qui lance une armée entière contre lui.",
      unlike : "5%",
      like : "95%",
      classUnlike : "w-[5%]",
      classLike : "w-[95%]",
    }
    it('tester la propriété css mask',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.div1')
            .should('have.css', 'mask-image')
            .and('include', `url("http://localhost:8080/assets/images/cover.svg")`)
    })
    it('tester src de l\'image 1',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.img1').should('have.attr', 'src',poster)
    })
    it('tester src de l\'image 2',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.img2').should('have.attr', 'src',poster)
    })
    it('tester alt de l\'image 1',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.img1').should('have.attr', 'alt',info.name)
    })
    it('tester alt de l\'image 2',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.img2').should('have.attr', 'alt',info.name)
    })
    it('tester le nom du film ou serie',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('h3').should('contain',info.name)
    })
    it('tester l\'année du film ou serie',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.pyear').should('contain',info.year)
    })
    it('tester le nom du directeur du film ou serie',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.director').should('contain',info.director)
    })
    it('tester le genre du film ou serie',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.genre').should('contain',info.genre)
    })
    it('tester le taux de vote du film ou serie',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.rate').should('contain',info.rate)
    })
    it('tester l\'année du film ou serie',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.spanyear').should('contain',info.year)
    })
    it('tester la courte description du film ou serie',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.shortDes').should('contain',info.shortDes)
    })
    it('tester la longue description du film ou serie',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.imore').click();
        cy.get('.longDes').should('have.text',info.description)
    })
    it('tester si la class idown est ajouté aprés un click',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.imore').click();
        cy.get('.imore').should('have.class','idown')
    })
    it('tester si la class idown est retiré aprés double click',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.imore').click();
        cy.get('.imore').click();
        cy.get('.imore').should('not.have.class','idown');
    })
    it('tester si le text est Réduire aprés un click',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.imore').click();
        cy.get('.imore').should('have.text','Réduire')
    })
    it('tester si le text est lire plus aprés double click',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.imore').click();
        cy.get('.imore').click();
        cy.get('.imore').should('have.text','Lire plus');
    })
    it('tester la class sur la balise div des like du film ou serie',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.div2').should('have.class',info.classLike)
    })
    it('tester la class sur la balise div des unlike  du film ou serie',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.div3').should('have.class',info.classUnlike)
    })
    it('tester le pourcentage de like du film ou serie',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.like').should('contain',info.like)
    })
    it('tester le pourcentage de unlike du film ou serie',()=>{
        cy.mount(<Poster mask={mask} poster={poster} info={info}/>);
        cy.get('.unlike').should('contain',info.unlike)
    })
})