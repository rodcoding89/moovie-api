import { useEffect, useState } from 'react';
import CardProvider from './utils/card-provider';
import MovieCard from './utils/movie-card';
import  MovieSlider  from './utils/slick';
import CardFilm from './utils/card-film';
import { filmStting } from './utils/card-film';
import ProviderComponent from './utils/provider-component';
import MovieComponent from './utils/movie-component';

import { HomeData } from 'src/api/home';

export default function Home(){
  
  const [listMovie, setListMovie] = useState<any[]>([]);
  const [listSerie, setListSerie] = useState<any[]>([]);
  const [listSalleMovie, setListSalleMovie] = useState<any[]>([]);
  const [listFilm, setListFilm] = useState<any[]>([]);
  const [listProvider, setListProvider] = useState<any[]>([]);
  const [listMovieTopRated, setListMovieTopRated] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState<unknown>(null);

  useEffect(()=>{
    const loadHomeData = async()=>{
      const {data,error,loading} = await HomeData();
      setError(error);
      setLoading(loading)
      console.log('data',data && data[4])
      const concatMutiTableToOne = (table1:any[] = [],table2:any[] = [])=>{
        return table1.concat(table2);
      }
    
      if (data) {
        setListMovie((prev)=>{
          return data[0].results.map((m:any,index:number)=>{
            return <MovieCard key={index} cardData={m} link={`film/${m.id}`}/>
          })
        });
        setListSerie((prev)=>{
          return data[1].results.map((m:any,index:number)=>{
            return <MovieCard key={index} cardData={m} link={`serie/${m.id}`}/>
          })
        });

        setListMovieTopRated((prev)=>{
          return data[2].results.map((m:any,index:number)=>{
            return <MovieCard key={index} cardData={m} link={`film/${m.id}`}/>
          })
        })

        setListSalleMovie((prev)=>{
          return data[3].results.map((m:any,index:number)=>{
            return <MovieCard key={index} cardData={m} link={`film/${m.id}`}/>
          })
        });

        setListFilm((prev)=>{
          return data[4].results.map((m:any,index:number)=>{
            return <CardFilm key={index} cardData={m} link={`serie/${m.id}`}/>
          })
        });
        const provider = concatMutiTableToOne(data ? data[5].results : [],data ? data[6].results : []);
        setListProvider((prev)=>{
          return provider.map((p:any,index:number)=>{
            return <CardProvider key={index} cardData={p} />
          })
        })
      }
    }
    loadHomeData();
  },[])
  
  
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 w-full h-[100vh]">
                <div className="bg-cover bg-no-repeat bg-center brightness-50 h-[100vh]" style={{backgroundImage:`url(${process.env.PUBLIC_URL}/assets/images/home.jpg)`}}></div>
                <div className="mt-[140px] absolute top-1/2 -translate-y-1/2 left-8 w-2/3 centerAbsoluteTop max-550:w-full max-550:left-5 max-550:right-5">
                    <h1 className="text-yellow bold text-[3em] max-370:text-[2em]">Filmes & Series</h1>
                    <p className="text-white regular text-2xl max-370:text-[1em]">Découvrez le cinéma sur toutes ses formes, visionnez des series TVs diffusées en ligne gratuitement.</p>
                </div>
            </div>
            <div className="pt-[110vh] flex flex-col items-center justify-center">
                <h3 className="text-yellow text-[1.75em] medium mb-5 mx-5">Service de streaming sur Movie API</h3>
                <div className='mb-10 w-[80vw]'>{!loading ? <div className="max-885:px-5"><ProviderComponent listProvider={listProvider} buttonStyle="w-10 h-10 rounded-full hover:bg-yellow" iconStyle="text-black group-hover/inner:text-black" movieType="film"/></div> : <div className="w-full flex items-center justify-center"><div className='loader'></div></div>}</div>
            </div>
            <div className='bg-black'>
                <div className='pl-[5vw] py-[5vh] film-popular'>
                    <h1 className='bold text-yellow text-[3em] w-1/2 leading-[1.2em] !p-5'>Découvrez les films et series TVs les plus populaires, les nouveautés et les prochaines sorties</h1>
                    <div className='relative flex items-start justify-start gap-x-10 mt-14 mb-20 film-popular-content'>
                        <div className='w-[20%] content-left'>
                            <h3 className='text-yellow text-[1.75em] mb-5'>Films populaires</h3>
                            <p className='text-second-white'>Découvrez les films les plus populaires en ce moment et où les regarder.</p>
                        </div>
                        <div className='flex-1 block w-[70%] content-right'>{!loading ? <MovieComponent listMovie={listMovie} carouselType="list" gap={30}/> : <div className="w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>}</div>
                    </div>
                    <div className='relative flex items-start justify-start gap-x-10 mb-20 serie-popular-content'>
                        <div className='w-[20%] content-left'>
                            <h3 className='text-yellow text-[1.75em] mb-5'>Series TVs populaire</h3>
                            <p className='text-second-white'>Découvrez les series TVs populaire en ce moment sur la plateforme.</p>
                        </div>
                        <div className='flex-1 block w-[70%] content-right'>{!loading ? <MovieComponent listMovie={listSerie} carouselType="list" gap={30}/> : <div className="w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>}</div>
                    </div>
                    <div className='relative flex items-start justify-start gap-x-10 mb-20 film-popular-content'>
                        <div className='w-[20%] content-left'>
                            <h3 className='text-yellow text-[1.75em] mb-5'>Les 10 filmes les mieux notés</h3>
                            <p className='text-second-white'>Découvrez les 10 filmes les mieux notés en ce moment sur la plateforme.</p>
                        </div>
                        <div className='flex-1 block w-[70%] content-right'>{!loading ? <MovieComponent listMovie={listMovieTopRated} carouselType="list" gap={30}/> : <div className="w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>}</div>
                    </div>
                    <div className='pr-[5vw] max-730:pr-0 max-730:mx-3 mb-20 max-730:mb-10'>
                      <div className='w-[100%]'>{!loading ? <MovieComponent listMovie={listFilm} carouselType="item" gap={0}/> : <div className="w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>}</div>
                    </div>
                    <div className='relative flex items-start justify-start gap-x-10 pb-5 max-730:flex-col max-730:text-center'>
                        <div className='w-[20%] max-730:w-full max-730:mb-5 max-730:px-5 box-border'>
                            <h3 className='text-yellow text-[1.75em] mb-5'>Les filmes actuellement en salle</h3>
                            <p className='text-second-white'>Découvrez les filmes actuellement en salle.</p>
                        </div>
                        <div className='flex-1 block w-[70%] max-730:w-full'>{!loading ? <MovieComponent listMovie={listSalleMovie} carouselType="list" gap={30}/> : <div className="w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}