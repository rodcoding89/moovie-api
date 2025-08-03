import Poster from "../utils/poster"
import Cast from "../utils/cast";
import CardProvider from "../utils/card-provider";
import MovieCard from "../utils/movie-card";
import { Link, useParams } from "react-router-dom";
import OtherMovie from "../utils/other-movie";


import CastComponent from "../utils/cast-component";

import ProviderComponent from "../utils/provider-component";
import MovieComponent from "../utils/movie-component";
import { options,image_base_url } from "src/constante/data";

import { formatGenre, getTime, mapOtherMovieInOnTable, mapToTable } from "src/util-function/fontions";
import { useEffect, useState } from "react";
import { UseGetTmDbDataCombined, UseGetTmDbPersonAndMovieGenre } from "src/api/film";
import Carousel from "src/util/carousel/carousel";

const providerStyle = 'text-white w-10 h-10 rounded-full hover:bg-yellow hover:text-black';

export default function SerieDetail(){
  const {id} = useParams();
  console.log('id',id);
  const [listSaison,setListSaison] = useState<any[]>([])
  const url = `https://api.themoviedb.org/3/tv/${id}?language=fr-FR&append_to_response=credits,videos,images`;
  const headers = options;
  const urlFilmProvider = `https://api.themoviedb.org/3/tv/${id}/season/1/watch/providers`;
  const [info,setInfo] = useState<any>(null)
  const [cast,setCast] = useState<any>('')
  const [castList,setCastList] = useState<any[]>([])
  const [crew,setCrew] = useState<any>('')
  const [catId,setCatId] = useState<any>()
  const [saison,setSaison] = useState<any>(0)
  const [listProvider,setProvider] = useState<any[]>([])
  const [listMovie,setListMovie] = useState<any[]>([])
  const [listAuthorMovie,setListAuthorMovie] = useState<any[]>([])
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState<unknown>(null);
  const [loading1,setLoading1] = useState(true);
  const [error1,setError1] = useState<unknown>(null);
  const [data,setData] = useState<any>(null);
  const [authorName,setAuthorName] = useState('')
  const [authorId,setAuthorId] = useState(0)
  const [currentScroll,setCurrentScroll] = useState(0)
  
  console.log('cast',cast);
  let actName = cast ? cast[0].name : ''
  let actId = cast ? cast[0].id : 0;
  let traillerLink = '';
  let traillerName = '';
  

  const urlFilmGenre = catId ? `https://api.themoviedb.org/3/discover/tv?with_genres=${catId}&language=fr`:'';
  
  const authorUrl:string = authorId ? `https://api.themoviedb.org/3/person/${authorId}/movie_credits?language=fr`: actId ? `https://api.themoviedb.org/3/person/${actId}/movie_credits?language=fr`:`https://api.themoviedb.org/3/person/182001/movie_credits?language=fr`;
  
  function getDirector(crew:any[]=[]){
    const data = crew ? crew.filter((c:any)=>c.job === 'Director' || c.job.toLowerCase().includes('Director'.toLowerCase()) || c.job.toLowerCase().includes('Assistant Director'.toLowerCase())): [];
    setAuthorName(data[0]?.original_name || data[0]?.name)
    setAuthorId(data[0]?.id)
    return data.map((d)=>d.name);
  }
  const previous = ()=>{
    setCurrentScroll((prev)=>{
      return prev > 1 ? prev - 1 : 0
    })
  }
  const next = ()=>{
    setCurrentScroll((prev)=>{
      return prev < saison - 1 ? prev + 1 : 0
    })
  }
  const percentFomTen = (value:number)=>{
    return value * 100 / 10
  }
  useEffect(()=>{
    const loadSerie = async()=>{
      const {data,error,loading} = await UseGetTmDbDataCombined(url,urlFilmProvider,headers);
      setError(error)
      setLoading(loading)
      const filmDetail = data ? data[0] : null
      const filmProvider = data ? data[1] : null
      
      setData(filmDetail)
      const saison = filmDetail.number_of_seasons;
      const cast = filmDetail?.credits.cast;
      const crew = filmDetail?.credits.crew;
      const catId = filmDetail?.genres[0]?.id ?? 0;
      const info = {
        name : filmDetail?.original_title || filmDetail?.name || "",
        year : filmDetail?.last_air_date.split('-')[0]+' - '+getTime(filmDetail?.episode_run_time[0]),
        director : "Directed by "+getDirector(crew).join(', '),
        genre : formatGenre(filmDetail?.genres).join(', '),
        rate : filmDetail?.vote_average,
        country : filmDetail?.origin_country.join(','),
        shortDes : filmDetail?.overview.split(' ',52).join(' '),
        description : filmDetail?.overview,
        unlike : (100 - percentFomTen(filmDetail?.vote_average)).toFixed(2)+"%",
        like : percentFomTen(filmDetail?.vote_average).toFixed(2)+"%",
        classUnlike : (100 - percentFomTen(filmDetail?.vote_average)).toFixed(2),
        classLike : percentFomTen(filmDetail?.vote_average).toFixed(2),
        vote_count : filmDetail?.vote_count
      }
      setInfo(info)
      setSaison(saison)
      setCast(cast)
      setCatId(catId)
      setCastList((prev)=>{
        return cast?.map((c:any,index:number)=>{
          return <Cast key={c.name+'_'+index} castData={c}/>
        })
      })
      filmDetail?.videos.results.forEach((v:any)=>{
        if (v.site === "YouTube") {
          traillerLink = "https://www.youtube.com/embed/"+v.key;
          traillerName = v.name;
        }
      })

      console.log("saison",saison)
      const saisonItem:any[] = [];
      for (let i = 0; i < saison; i++) {
        const item = <div key={i} className=" cursor-pointer w-full"><Link className="w-full min-w-[145px] block" to={'season/'+(i+1)} style={{maxWidth:180}}><img className="mb-2" src={image_base_url+filmDetail?.poster_path} alt="saison"/>Saison {i+1}</Link></div>
        saisonItem.push(item)
      }
      setListSaison((prev)=>{
          return saisonItem
      })
      console.log("listsaison",listSaison)
      const provider:any[] = mapToTable(filmProvider.results ?? []);
      setProvider((prev)=>{
        return provider.map((p:any,index:number)=>{
          return <CardProvider key={index+'_'+p.provider_name} cardData={p} />
        })
      })
    }
    const loadSerieGenre = async()=>{
      const {data,error,loading} = await UseGetTmDbPersonAndMovieGenre(urlFilmGenre,authorUrl,headers);
      setError1(error)
      setLoading1(loading)
      const filmGenre = data ? data[0] : null
      const otherFilm = data ? data[1] : null
      if (filmGenre && filmGenre.results) {
        setListMovie((prev)=>{
        return filmGenre?.results.map((m:any,index:number)=>{
            return <MovieCard key={index+"_"+m.title} cardData={m} link={`../serie/${m.id}`}/>
          })
        })
      }
      //console.log("filmGenre",filmGenre,"otherFilm",otherFilm)
      if (otherFilm) {
        setListAuthorMovie((prev)=>{
        return mapOtherMovieInOnTable(otherFilm).map((movie:any,index:number)=> {
            return <MovieCard key={index+"_"+movie.title} cardData={movie} link={`../serie/${movie.id}`}/>
          })
        }) 
      }
    }
    loadSerie()
    loadSerieGenre()
  },[url,urlFilmProvider,urlFilmGenre,authorUrl])

    return (
        <div className="bg-black relative">
            <section>
                <div>
                  {
                    !loading ? !error ? <Poster mask={image_base_url+data?.poster_path} poster={image_base_url+data?.poster_path} info={info}/> : <div className="w-full"><p className="text-center z-10 relative">Données indisponible pour le moment</p></div> : <div className="w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>
                  }
                  
                  <div className="w-[90%] mx-auto flex justify-center items-center gap-x-10 relative z-10 mt-3 mb-16 flex-col">
                    <h4 className="bold mb-5 text-yellow mx-5">Toutes les saisons de "{data?.original_title ? data?.original_title : data?.name}" en streaming</h4>
                    <div className="w-full flex-nowrap flex justify-center items-center gap-10 relative z-10">{!loading ? !error ? <Carousel items={listSaison} itemsLength={saison} childWidth={180} iconStyle="text-yellow" navButtonStyle="w-10 h-10 rounded-full hover:bg-[#000]" carouselType="list"/> : <div className="w-full"><p className="text-center z-10 relative">Données indisponible pour le moment</p></div> : <div className="w-full flex items-center justify-center "><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>}</div>
                  </div>
                </div>
            </section>
            
            <section>
                <div className="cast mx-auto my-5 w-[90vw] z-10 relative">
                    <h3 className="mb-5 text-white text-[1.6em] bold max-730:text-center max-730:mx-5">Casting {data?.original_title ? data?.original_title : data?.name}</h3>
                    {
                      !loading ? !error ? <div className="max-885: px-5"><CastComponent castList={castList} responsive={[]}/></div> : <div className="w-full"><p className="text-center z-10 relative">Données indisponible pour le moment</p></div> : <div className="w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>
                    }
                </div>
                {
                  !loading ? !error ? traillerLink ? <div className="z-10 relative w-full flex items-center justify-center flex-col"><div><h3 className="mb-5 mt-5 text-white text-[1.6em] bold max-730:text-center max-730:mx-5">Regarder un extrait de cette serie</h3><iframe className="w-[50vw] h-[350px]" src={traillerLink} title={traillerName} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe><h5 className=" text-yellow text-[1.2em] bold my-2">{data?.original_title ? data?.original_title : data?.name}</h5>
                      <p className="text-second-white mb-5">Trailler</p></div></div> : <div className="trailler mx-auto my-5 w-[90vw] z-10 relative flex flex-col items-center justify-center">
                    <h3 className="mb-5 text-white text-[1.6em] bold max-730:text-center max-730:mx-5">Regarder un extrait de cette serie</h3>
                    <div className="poster w-full min-w-[280px] max-w-[720px] h-fit py-[50px] bg-black flex justify-center items-center flex-col relative">
                      <img className="w-auto h-auto" src={image_base_url+data?.poster_path} alt="poster" />
                      <h5 className=" text-yellow text-[1.2em] bold my-2">{data?.original_title ? data?.original_title : data?.name}</h5>
                      <p className="text-second-white">Trailler</p>
                      <Link target="_blanc" className="absolute top-3 right-3 py-1 px-3 bg-yellow text-black rounded-lg text-[11px]" to={`https://www.themoviedb.org/tv/${id}-${data?.original_title?.toLowerCase().replaceAll(" ","-")}/watch`}>Preview</Link>
                    </div>
                  </div> : <div className="w-full"><p className="text-center z-10 relative">Données indisponible pour le moment</p></div> : <div className="w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>
                }
                <div className="my-5 mx-auto w-[90vw] z-10 relative mb-5">
                    <h3 className="text-white text-[1.75em] medium mb-5 max-730:text-center">Service de streaming pour cette serie</h3>
                    <div className="w-[90vw] mx-auto">{!loading ? !error ? <div className="max-885:px-5"><ProviderComponent listProvider={listProvider} buttonStyle="w-10 h-10 rounded-full hover:bg-yellow" iconStyle="text-black group-hover/inner:text-black" movieType="film"/></div> : <div className="w-full"><p className="text-center z-10 relative">Données indisponible pour le moment</p></div> : <div className="w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>}</div>
                </div>
                <div className="relative mx-auto z-10 w-[100%] mt-[50px] mb-10 flex gap-x-5 items-start max-730:flex-col">
                    <div className="w-[30%] max-730:w-full max-730:mb-10">
                        <h3 className="text-yellow text-[1.75em] ml-[5vw] medium mb-5 max-730:text-center max-730:mx-5">Series qui pourraient aussi vous intéresser</h3>
                        <p className="text-white medium ml-[5vw] max-730:text-center max-730:mx-5">Parcourez les series qui pouraient correspondre à vos critères.</p>
                    </div>
                    <div className="w-[70%] max-730:w-full">{!loading1 ? !error1 && listMovie.length > 0 ? <MovieComponent listMovie={listMovie} carouselType="list" gap={30}/> : <div className="w-full"><p className="text-center z-10 relative">Données indisponible pour le moment</p></div> : <div className="w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>}</div>
                </div>
                <div className="relative my-5 z-10">
                    <h3 className="text-white text-[1.75em] ml-[5vw] mb-8 max-730:text-center max-730:mx-5">Autre serie avec {authorName ? authorName : actName}</h3>
                    <div className="ml-[5vw] max-730:ml-0">
                      {!loading1 ? !error1 && listAuthorMovie.length > 0 ? <MovieComponent listMovie={listAuthorMovie} carouselType="list" gap={30}/> : <div className="w-full"><p className="text-left z-10 relative">Données indisponible pour le moment</p></div> : <div className="w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>}
                    </div>
                </div>  
            </section>
        </div>
    )
}