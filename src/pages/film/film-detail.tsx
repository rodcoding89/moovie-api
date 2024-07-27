import { useState } from "react"
import MovieSlider from "../utils/slick";
import Cast from "./cast";

const cast:any[] = [{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"}]
const castList = cast.map((c,index)=>{
    return <Cast key={index} castData={c}/>
})
const castStyle = 'text-black w-10 h-10 rounded-full hover:bg-slate-100';
export default function FilmDetail(){
    const [display,setDisplay] = useState(true);
    const [displayMore,setDisplayMore] = useState(false);
    const [textMore,setTextMore] = useState(true);
    const [castActuelItem,setCastActuelItem] = useState(0);
    const castSettings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 9,
        slidesToScroll: 1,
        beforeChange: (current:any, next:number) => setCastActuelItem(next),
        responsive: [
            {
              breakpoint: 2500,
              settings: {
                slidesToShow: 11,
              }
            },
            {
                breakpoint: 1820,
                settings: {
                  slidesToShow: 10,
                }
              },
            {
                breakpoint: 1638,
                settings: {
                  slidesToShow: 9,
                }
              },
            {
              breakpoint: 1456,
              settings: {
                slidesToShow: 8,
              }
            },
            {
              breakpoint: 1274,
              settings: {
                slidesToShow: 7,
              }
            },
            {
                breakpoint: 1092,
                settings: {
                  slidesToShow: 6,
                }
            },
            {
                breakpoint: 910,
                settings: {
                  slidesToShow: 5,
                }
            },
            {
                breakpoint: 728,
                settings: {
                  slidesToShow: 4,
                }
            },
            {
                breakpoint: 546,
                settings: {
                  slidesToShow: 3,
                }
            },
            {
                breakpoint: 364,
                settings: {
                  slidesToShow: 2,
                }
            },
            {
                breakpoint: 182,
                settings: {
                  slidesToShow: 1,
                }
            }
        ]
    };
    return (
        <div className="">
            <div className="flex justify-start items-start gap-x-9 relative">
                <img className="brightness-[.3] absolute top-0 left-0 object-cover" src={process.env.PUBLIC_URL+'/assets/images/photo.avif'} alt="poster"/>
                <div className="w-[320px] pl-[5vw] py-[5vw] z-10">
                    <img src={process.env.PUBLIC_URL+'/assets/images/photo.avif'} alt="poster" />
                </div>
                <div className="w-[50%] pr-[5vw] py-[5vw] z-10">
                    <h3 className="text-white text-[2em] mb-0 bold">Noé</h3>
                    <span className="text-second-white text-[.75em] block mt-[-8px]">Directed by Darren Aronofsky</span>
                    <p className="mt-3 mb-1 text-primaire-white text-[.85em]">2014 2h 18min TP</p>
                    <span className="text-primaire-white text-[.85em]">Drame, Action et Adventure</span><br/>
                    <span className="text-primaire-white text-[.85em]">5.8</span>
                    <p className={display?'block text-white regular':'hidden text-white'}>Noé, un père de famille, reçoit un message de Dieu au cours d’un rêve : la Terre s’apprête à subir un déluge apocalyptique, car l’homme a corrompu le monde à force de violence et d’avidité. Il part alors avec sa femme et ses enfants sur le mont Ararat et entreprend la</p><p className={displayMore?'block text-white regular':'hidden text-white'}>Noé, un père de famille, reçoit un message de Dieu au cours d’un rêve : la Terre s’apprête à subir un déluge apocalyptique, car l’homme a corrompu le monde à force de violence et d’avidité. Il part alors avec sa femme et ses enfants sur le mont Ararat et entreprend la construction d’une arche monumentale pour mettre à l’abri toutes les espèces existantes de l’humanité, sauver les innocents et préserver la vie sur Terre. Il accomplit ainsi son destin hors du commun. Mais il se heurte à un seigneur de la guerre qui cherche à régner sur ce monde dévasté, et qui lance une armée entière contre lui</p><span className={displayMore?'idown text-yellow cursor-pointer':'text-yellow cursor-pointer'} onClick={()=>{setDisplayMore(!displayMore);setDisplay(!display);setTextMore(!textMore)}}>{textMore?'Lire plus':'Réduire'}<i className="fa fa-angle-up ml-2 text-yellow" aria-hidden="true"></i></span>
                </div>
            </div>
            <div className="cast m-5">
                <MovieSlider settings={castSettings} data={castList} width={'w-[80vw]'} providerStyle={castStyle} left=' left-[25px] ' right=' right-[25px] ' currentItem={castActuelItem}/>
            </div>
        </div>
    )
}