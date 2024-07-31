import { useState } from 'react';
import CardProvider from './utils/card-provider';
import MovieCard from './utils/movie-card';
import  MovieSlider  from './utils/slick';
import CardFilm from './utils/card-film';
import { filmStting } from './utils/card-film';

const provider = ['assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp','assets/images/provider.webp'];
const movieSlider = ['assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp','assets/images/twister.webp'];
const movie = [{linkImg:'assets/images/the-acolyte.jpeg',linkImg1:"assets/images/the-acolyte.webp",name:"Star Wars : The Acolyte",rate:"3.9  (105k)",description:" Cent ans avant la naissance de l'Empire, l'Ordre Jedi et la République Galactique prospéraient depuis des siècles, sans la moindre guerre. Lors d'une enquête concernant un crime odieux, un Maître Jedi va devoir affronter un dangereux guerrier surgissant de son passé."},{linkImg:'assets/images/the-acolyte.jpeg',linkImg1:"assets/images/the-acolyte.webp",name:"Star Wars : The Acolyte",rate:"3.9  (105k)",description:" Cent ans avant la naissance de l'Empire, l'Ordre Jedi et la République Galactique prospéraient depuis des siècles, sans la moindre guerre. Lors d'une enquête concernant un crime odieux, un Maître Jedi va devoir affronter un dangereux guerrier surgissant de son passé."},{linkImg:'assets/images/the-acolyte.jpeg',linkImg1:"assets/images/the-acolyte.webp",name:"Star Wars : The Acolyte",rate:"3.9  (105k)",description:" Cent ans avant la naissance de l'Empire, l'Ordre Jedi et la République Galactique prospéraient depuis des siècles, sans la moindre guerre. Lors d'une enquête concernant un crime odieux, un Maître Jedi va devoir affronter un dangereux guerrier surgissant de son passé."},{linkImg:'assets/images/the-acolyte.jpeg',linkImg1:"assets/images/the-acolyte.webp",name:"Star Wars : The Acolyte",rate:"3.9  (105k)",description:" Cent ans avant la naissance de l'Empire, l'Ordre Jedi et la République Galactique prospéraient depuis des siècles, sans la moindre guerre. Lors d'une enquête concernant un crime odieux, un Maître Jedi va devoir affronter un dangereux guerrier surgissant de son passé."}]
const listProvider:any[] = provider.map((p:any,index:number)=>{
    return <CardProvider key={index} cardData={p} />
})
const listMovie:any[] = movieSlider.map((m,index)=>{
    return <MovieCard key={index} cardData={m}/>
})
const listFilm:any[] = movie.map((l,index)=>{
  return <CardFilm key={index} cardData={l}/>
})
const providerStyle = 'text-black w-10 h-10 rounded-full hover:bg-slate-100';
const movieStyle = "text-yellow w-[60px] h-full movie";
export default function Home(){
  const [providerActuelItem, setProviderActuelItem] = useState(0);
  const [movieActuelItem, setMovieActuelItem] = useState(0);
  const [serieActuelItem, setSerieActuelItem] = useState(0);
  const [newMovieItem, setNewMovieItem] = useState(0);
  const [salleMovieItem, setSalleMovieItem] = useState(0);
  const responsive = [
    {
      breakpoint: 2500,
      settings: {
        slidesToShow: 8,
      }
    },
    {
        breakpoint: 2000,
        settings: {
          slidesToShow: 7,
        }
      },
    {
        breakpoint: 1800,
        settings: {
          slidesToShow: 6,
        }
      },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 5,
      }
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
      }
    },
    {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
        }
    },
    {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        }
    },
    {
        breakpoint: 700,
        settings: {
          slidesToShow: 4,
        }
    },
    {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        }
    },
    {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
    },
    {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
    }
]
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
    responsive: responsive
  }
  const serieStting = {
    dots: false,
    infinite: true,
    arrows: false,
    centerMode: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    beforeChange: (current:any, next:number) => setSerieActuelItem(next),
    responsive: responsive
  }
  const newMovieStting = {
    dots: false,
    infinite: true,
    arrows: false,
    centerMode: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    beforeChange: (current:any, next:number) => setNewMovieItem(next),
    responsive: responsive
  }
  const salleMovieStting = {
    dots: false,
    infinite: true,
    arrows: false,
    centerMode: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    beforeChange: (current:any, next:number) => setSalleMovieItem(next),
    responsive: responsive
  }
    return (
        <div className="relative">
            <div className="bgheight relative">
                <div className="bg-cover bg-no-repeat bg-center brightness-50 h-full" style={{backgroundImage:`url(${process.env.PUBLIC_URL}/assets/images/home.png)`}}></div>
                <div className="absolute w-1/3 centerAbsoluteTop left-[65px]">
                    <h1 className="text-yellow bold text-[3em]">Filmes & TVs</h1>
                    <p className="text-white regular text-2xl">Découvrez le cinéma sur toutes ses formes, visionnez des series TVs diffusées en ligne gratuitement.</p>
                </div>
            </div>
            <div className="mt-5 flex flex-col items-center justify-center">
                <h3 className="text-yellow text-[1.75em] medium mb-5">Service de streaming sur Movie API</h3>
                <div className='mb-10'><MovieSlider settings={providerSettings} data={listProvider} width={'w-[80vw]'} providerStyle={providerStyle} left=' left-[-65px] ' right=' right-[-65px] ' currentItem={providerActuelItem}/></div>
            </div>
            <div className='bg-black'>
                <div className='pl-[5vw] py-[5vh]'>
                    <h1 className='bold text-yellow text-[3em] w-1/2 leading-[1.2em]'>Découvrez les films et chaines TVs les plus populaires, les nouveautés et les prochaines sorties</h1>
                    <div className='relative flex items-start justify-start gap-x-10 mt-14 mb-20'>
                        <div className='w-[20vw]'>
                            <h3 className='text-yellow text-[1.75em] mb-5'>Films populaires</h3>
                            <p className='text-second-white'>Découvrez les films les plus populaires en ce moment et où les regarder.</p>
                        </div>
                        <div className='flex-1 block w-[65vw]'><MovieSlider settings={movieStting} data={listMovie} width={'w-[100%]'} providerStyle={movieStyle} left=' left-0 ' right=' right-0 ' currentItem={movieActuelItem}/></div>
                    </div>
                    <div className='relative flex items-start justify-start gap-x-10 mb-20'>
                        <div className='w-[20vw]'>
                            <h3 className='text-yellow text-[1.75em] mb-5'>Chaine TVs populaire</h3>
                            <p className='text-second-white'>Découvrez les chaines TVs populaire en ce moment sur la plateforme.</p>
                        </div>
                        <div className='flex-1 block w-[65vw]'><MovieSlider settings={serieStting} data={listMovie} width={'w-[100%]'} providerStyle={movieStyle} left=' left-0 ' right=' right-0 ' currentItem={serieActuelItem}/></div>
                    </div>
                    <div className='relative flex items-start justify-start gap-x-10 mb-20'>
                        <div className='w-[20vw]'>
                            <h3 className='text-yellow text-[1.75em] mb-5'>Les 10 filmes les mieux notés</h3>
                            <p className='text-second-white'>Découvrez les 10 filmes les mieux notés en ce moment sur la plateforme.</p>
                        </div>
                        <div className='flex-1 block w-[65vw]'><MovieSlider settings={newMovieStting} data={listMovie} width={'w-[100%]'} providerStyle={movieStyle} left=' left-0 ' right=' right-0 ' currentItem={newMovieItem}/></div>
                    </div>
                    <div className='mr-[5vw] mb-20'>
                      <div className='w-[100%]'><MovieSlider settings={filmStting} data={listFilm} width={'w-[100%]'} providerStyle={' hidden '} left=' left-0 ' right=' right-0 ' currentItem={0}/></div>
                    </div>
                    <div className='relative flex items-start justify-start gap-x-10 mb-20'>
                        <div className='w-[20vw]'>
                            <h3 className='text-yellow text-[1.75em] mb-5'>Les filmes actuellement en salle</h3>
                            <p className='text-second-white'>Découvrez les filmes actuellement en salle.</p>
                        </div>
                        <div className='flex-1 block w-[65vw]'><MovieSlider settings={salleMovieStting} data={listMovie} width={'w-[100%]'} providerStyle={movieStyle} left=' left-0 ' right=' right-0 ' currentItem={salleMovieItem}/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}