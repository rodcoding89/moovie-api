import { useState } from "react"
import MovieSlider from "../utils/slick";
import Cast from "./cast";
import CardProvider from "../utils/card-provider";
import MovieCard from "../utils/movie-card";
import Poster from "../utils/poster";

const cast:any[] = [{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"},{name:"Ariane Rinehart",actorName:"Eve",link:"assets/images/actor.avif"}];
const provider = ['assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp'];
const movieSlider = ['assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp'];
const castList = cast.map((c,index)=>{
    return <Cast key={index} castData={c}/>
})
const listProvider:any[] = provider.map((p:any,index:number)=>{
  return <CardProvider key={index} cardData={p} />
})
const listMovie:any[] = movieSlider.map((m,index)=>{
  return <MovieCard key={index} cardData={m}/>
})
const castStyle = 'text-white w-10 h-10 rounded-full hover:bg-slate-100 hover:text-black';
const providerStyle = 'text-white w-10 h-10 rounded-full hover:bg-slate-100 hover:text-black';
const movieStyle = "text-yellow w-[60px] h-full movie";
export default function FilmDetail(){
    const [castActuelItem,setCastActuelItem] = useState(0);
    const [providerActuelItem, setProviderActuelItem] = useState(0);
    const [movieActuelItem, setMovieActuelItem] = useState(0);
    const [otherMovieActuelItem, setOtherMovieActuelItem] = useState(0);
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
    const castSettings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 11,
        slidesToScroll: 1,
        beforeChange: (current:any, next:number) => setCastActuelItem(next),
        responsive: [
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
    };
    const providerSettings = {
      dots: false,
      infinite: false,
      arrows: false,
      speed: 500,
      slidesToShow: 9,
      slidesToScroll: 1,
      beforeChange: (current:any, next:number) => setProviderActuelItem(next),
      responsive: [
          {
            breakpoint: 2500,
            settings: {
              slidesToShow: 11,
            }
          },
          {
              breakpoint: 1500,
              settings: {
                slidesToShow: 7,
              }
            },
          {
              breakpoint: 1100,
              settings: {
                slidesToShow: 6,
              }
            },
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 5,
            }
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 4,
            }
          },
          {
              breakpoint: 500,
              settings: {
                slidesToShow: 3,
              }
          },
          {
              breakpoint: 300,
              settings: {
                slidesToShow: 2,
              }
          }
      ]
  };
  const movieStting = {
    dots: false,
    infinite: true,
    arrows: false,
    centerMode: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    beforeChange: (current:any, next:number) => setMovieActuelItem(next),
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 5,
        }
      },
      {
          breakpoint: 1773,
          settings: {
            slidesToShow: 4,
          }
      },
      {
        breakpoint: 1275,
        settings: {
          slidesToShow: 3,
        }
      },
      {
          breakpoint: 986,
          settings: {
            slidesToShow: 2,
          }
      },
      {
          breakpoint: 774,
          settings: {
            slidesToShow: 4,
          }
      },
      {
        breakpoint: 543,
        settings: {
          slidesToShow: 3,
        }
    },
    {
        breakpoint: 362,
        settings: {
          slidesToShow: 2,
        }
    },
    {
        breakpoint: 181,
        settings: {
          slidesToShow: 1,
        }
    }
  ]
  }
  const otherMovieStting = {
    dots: false,
    infinite: true,
    arrows: false,
    centerMode: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    beforeChange: (current:any, next:number) => setOtherMovieActuelItem(next),
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 7,
        }
      },
      {
          breakpoint: 1520,
          settings: {
            slidesToShow: 6,
          }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 5,
        }
      },
      {
          breakpoint: 933,
          settings: {
            slidesToShow: 4,
          }
      },
      {
          breakpoint: 737,
          settings: {
            slidesToShow: 3,
          }
      },
      {
        breakpoint: 537,
        settings: {
          slidesToShow: 2,
        }
    },
    {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
        }
    }
  ]
  }
    return (
        <div className="bg-black">
          <Poster mask={process.env.PUBLIC_URL+'/assets/images/cover.svg'} poster={process.env.PUBLIC_URL+'/assets/images/photo.avif'} info={info}/>
            <div className="cast mx-auto my-5 w-[90vw] z-10 relative">
              <h3 className="mb-5 text-white text-[1.6em] bold">Casting de Noé</h3>
              <MovieSlider settings={castSettings} data={castList} width={'w-[100%]'} providerStyle={castStyle} left=' left-[-25px] ' right=' right-[-25px] ' currentItem={castActuelItem}/>
            </div>
            <div className="trailler mx-auto my-5 w-[90vw] z-10 relative">
              <h3 className="mb-5 text-white text-[1.6em] bold">Regarder un extrait de la vidéo</h3>
              <div className="poster cursor-pointer">
                <img className="w-[200px]" src={process.env.PUBLIC_URL+'/assets/images/the-acolyte.jpeg'} alt="poster" />
                <h5 className=" text-yellow text-[1.2em] bold my-2">Noé</h5>
                <p className="text-second-white">Trailler</p>
              </div>
            </div>
            <div className="my-5 mx-auto w-[90vw] z-10 relative mb-5">
                <h3 className="text-white text-[1.75em] medium mb-5">Service de streaming pour cette vidéo</h3>
                <MovieSlider settings={providerSettings} data={listProvider} width={'w-[100%]'} providerStyle={providerStyle} left=' left-[-25px] ' right=' right-[-25px] ' currentItem={providerActuelItem}/>
            </div>
            <div className="relative mx-auto z-10 w-[100%] mt-[50px] mb-10 flex gap-x-5 items-start">
              <div className="w-[30vw]">
                <h3 className="text-yellow text-[1.75em] ml-[5vw] medium mb-5 w-[100%]">Filmes qui pourraient aussi vous intéresser</h3>
                <p className="text-white medium ml-[5vw]">Parcourez les filmes qui pouraient correspondre à vos critères.</p>
              </div>
              <MovieSlider settings={movieStting} data={listMovie} width={'w-[65vw]'} providerStyle={movieStyle} left=' left-0 ' right=' right-0 ' currentItem={movieActuelItem}/>
            </div>
            <div className="relative my-5 z-10">
              <h3 className="text-white text-[1.75em] ml-[5vw] mb-8">Autre filmes avec Darren Aronofsky</h3>
              <div className="ml-[5vw]">
                <MovieSlider settings={otherMovieStting} data={listMovie} width={'w-[100%]'} providerStyle={movieStyle} left=' left-0 ' right=' right-0 ' currentItem={otherMovieActuelItem}/>
              </div>
            </div>
        </div>
    )
}