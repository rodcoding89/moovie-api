import Cast from 'src/pages/utils/cast';
import  MovieSlider  from '../../src/pages/utils/slick';


describe('slick carousel test', () => {
  it('test next button click', () => {
    const cast = [{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"}]
    const castList = cast.map((c,index)=>{
      return (<Cast key={index} castData={c}/>)
    })
    let props = {
      settings:{
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 11,
        slidesToScroll: 1,
      },
      data:castList,
      width:"w-[100%]",
      providerStyle:"",
      left:"",
      right:"",
      currentItem:1
    }
    cy.mount(<MovieSlider {...props}/>);
    cy.get('.next').click();
    cy.eq(2)
  })
})