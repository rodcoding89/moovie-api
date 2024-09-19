import Cast from "../utils/cast";
import CardProvider from "../utils/card-provider";
import MovieCard from "../utils/movie-card";
import Poster from "../utils/poster";
import CastComponent from "../utils/cast-component";
import OtherMovie from "../utils/other-movie";
import ProviderComponent from "../utils/provider-component";
import { movieSlider, provider } from "../home";
import MovieComponent from "../utils/movie-component";

export const cast:any[] = [{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"}];
const providerStyle = 'text-white w-10 h-10 rounded-full hover:bg-yellow hover:text-black';
const castList = cast.map((c,index)=>{
    return <Cast key={index} castData={c}/>
})
const listProvider:any[] = provider.map((p:any,index:number)=>{
  return <CardProvider key={index} cardData={p} />
})
const listMovie:any[] = movieSlider.map((m,index)=>{
  return <MovieCard key={index} cardData={m} link={`../film/${index+1}`}/>
})

export default function FilmDetail(){
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
  const responsive = [
    {
      breakpoint: 2500,
      settings: {
        slidesToShow: 10,
      }
    },
    {
        breakpoint: 1820,
        settings: {
          slidesToShow: 9,
        }
      },
    {
        breakpoint: 1638,
        settings: {
          slidesToShow: 8,
        }
      },
    {
      breakpoint: 1456,
      settings: {
        slidesToShow: 7,
      }
    },
    {
      breakpoint: 1274,
      settings: {
        slidesToShow: 6,
      }
    },
    {
        breakpoint: 1092,
        settings: {
          slidesToShow: 5,
        }
    },
    {
        breakpoint: 910,
        settings: {
          slidesToShow: 4,
        }
    },
    {
        breakpoint: 728,
        settings: {
          slidesToShow: 3,
        }
    },
    {
        breakpoint: 546,
        settings: {
          slidesToShow: 2,
        }
    },
    {
        breakpoint: 364,
        settings: {
          slidesToShow: 1,
        }
    }
]
    return (
        <div className="bg-black">
          <Poster mask={process.env.PUBLIC_URL+'/assets/images/cover.svg'} poster={process.env.PUBLIC_URL+'/assets/images/photo.avif'} info={info}/>
            <div className="cast mx-auto my-5 w-[90vw] z-10 relative">
              <h3 className="mb-5 text-white text-[1.6em] bold max-730:text-center max-730:mx-5">Casting de Noé</h3>
              <CastComponent castList={castList} responsive={responsive}/>
            </div>
            <div className="trailler mx-auto my-5 w-[90vw] z-10 relative flex flex-col items-center justify-center">
              <h3 className="mb-5 text-white text-[1.6em] bold max-730:text-center max-730:mx-5">Regarder un extrait de ce film</h3>
              <div className="poster cursor-pointer">
                <img className="w-[50vw] max-700:w-[75vw]" src={process.env.PUBLIC_URL+'/assets/images/the-acolyte.jpeg'} alt="poster" />
                <h5 className=" text-yellow text-[1.2em] bold my-2">Noé</h5>
                <p className="text-second-white">Trailler</p>
              </div>
            </div>
            <div className="my-5 mx-auto w-[90vw] z-10 relative mb-5">
                <h3 className="text-white text-[1.75em] medium mb-5 max-730:text-center">Service de streaming pour ce film</h3>
                <ProviderComponent listProvider={listProvider} providerStyle={providerStyle} left=" left-0 " right=" right-0 "/>
            </div>
            <div className="relative mx-auto z-10 w-[100%] mt-[50px] mb-10 flex gap-x-5 items-start max-730:flex-col">
              <div className="w-[30%] max-730:w-full max-730:mb-10">
                <h3 className="text-yellow text-[1.75em] ml-[5vw] medium mb-5 max-730:text-center max-730:mx-5">Filmes qui pourraient aussi vous intéresser</h3>
                <p className="text-white medium ml-[5vw] max-730:text-center max-730:mx-5">Parcourez les filmes qui pouraient correspondre à vos critères.</p>
              </div>
              <div className="w-[70%] max-730:w-full"><MovieComponent listMovie={listMovie}/></div>
            </div>
            <div className="relative my-5 z-10">
              <h3 className="text-white text-[1.75em] ml-[5vw] mb-8 max-730:text-center max-730:ml-0">Autre filmes avec Darren Aronofsky</h3>
              <div className="ml-[5vw] max-730:mx-5">
                <OtherMovie listMovie={listMovie}/>
              </div>
            </div>
        </div>
    )
}