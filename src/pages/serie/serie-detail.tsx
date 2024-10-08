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
import { UseGetTmDbDataCombined, UseGetTmDbPersonAndMovieGenre } from "src/hooks/pages-hook";

const providerStyle = 'text-white w-10 h-10 rounded-full hover:bg-yellow hover:text-black';

export default function SerieDetail(){
  const {id} = useParams();
  const listSaison = [];
  const url = `https://api.themoviedb.org/3/tv/${id}?language=fr-FR&append_to_response=credits,videos,images`;
  const headers = options;
  const urlFilmProvider = `https://api.themoviedb.org/3/movie/${id}/watch/providers`;
  
  const {data,error,loading} = UseGetTmDbDataCombined(url,urlFilmProvider,headers);
  console.log('data',data);
  const saison = data?.filmDetail.number_of_seasons;
  const cast = data?.filmDetail?.credits.cast;
  const crew = data?.filmDetail?.credits.crew;
  const catId = data?.filmDetail?.genres[0].id;
  let authorName = '';
  console.log('cast',cast);
  let actName = cast ? cast[0].name : ''
  let actId = cast ? cast[0].id : 0;
  let traillerLink = '';
  let traillerName = '';
  data?.filmDetail?.videos.results.forEach((v:any)=>{
    if (v.site === "YouTube") {
      traillerLink = "https://www.youtube.com/embed/"+v.key;
      traillerName = v.name;
    }
  })
  let authorId = 0;
  const info = {
    name : data?.filmDetail?.name,
    year : data?.filmDetail?.last_air_date.split('-')[0]+' - '+getTime(data?.filmDetail?.episode_run_time[0]),
    director : "Directed by "+getDirector(crew).join(', '),
    genre : formatGenre(data?.filmDetail?.genres).join(', '),
    rate : data?.filmDetail?.vote_average,
    country : data?.filmDetail?.origin_country.join(','),
    shortDes : data?.filmDetail?.overview.split(' ',52).join(' '),
    description : data?.filmDetail?.overview,
    unlike : "5%",
    like : "95%",
    classUnlike : "w-[5%]",
    classLike : "w-[95%]",
  }
  for (let i = 0; i < saison; i++) {
    listSaison.push(<div key={i} className="cursor-pointer"><Link className="w-[165px]" to={'season/'+data?.filmDetail.id}><img className="mb-2" src={image_base_url+data?.filmDetail?.poster_path} alt="saison"/>Saison {i+1}</Link></div>)
  }
  const castList = cast?.map((c:any,index:number)=>{
    return <Cast key={c.name+'_'+index} castData={c}/>
  })
  const urlFilmGenre = catId ? `https://api.themoviedb.org/3/discover/tv?with_genres=${catId}&language=fr`:'';
  
  const authorUrl:string = authorId ? `https://api.themoviedb.org/3/person/${authorId}/movie_credits?language=fr`: actId ? `https://api.themoviedb.org/3/person/${actId}/movie_credits?language=fr`:`https://api.themoviedb.org/3/person/182001/movie_credits?language=fr`;
  const {data:movieData,error:movieGenreError,loading:movieGenreLoading} = UseGetTmDbPersonAndMovieGenre(urlFilmGenre,authorUrl,headers);
  console.log('filmGenre',movieData,actId,actName);
  const listMovie:any[] = movieData?.filmGenre.results.map((m:any,index:number)=>{
    return <MovieCard key={index} cardData={m} link={`../film/${m.id}`}/>
  })
  
  const listAuthorMovie:any = mapOtherMovieInOnTable(movieData?.otherFilm).map((movie:any,index:number)=> {
    return <MovieCard key={index} cardData={movie} link={`../film/${movie.id}`}/>
  })
  const provider:any = mapToTable(data?.filmProvider.results);
  console.log('provider',data?.filmDetail?.episode_run_time[0])
  const listProvider:any[] = provider.map((p:any,index:number)=>{
    return <CardProvider key={index} cardData={p} />
  })
  function mapOtherMovieInOnTable(data:any){
    let table:any[] = [];
    if (data) {
      if (Object.keys(data).length > 0) {
        Object.keys(data).forEach(key =>{
          if (Array.isArray(data[key])) {
            table.push(...data[key])
          }
        })
      }
    }
    return table;
  }
  function mapToTable(data: any) {
    let table: any[] = [];
    if (data) {
        if (Object.keys(data).length > 0) {
            //console.log('test1');
            Object.keys(data).forEach(key => {
                if (data[key] !== 'link') {
                    Object.keys(data[key]).forEach(k => {
                        //console.log('table', table, 'key', data[key][k]);

                        // Si data[key][k] est un tableau, utilise le spread
                        if (Array.isArray(data[key][k])) {
                            table.push(...data[key][k]); // Ajoute les éléments du tableau
                        } else {
                            //table.push(data[key][k]); // Ajoute directement la valeur si ce n'est pas un tableau
                        }

                        // Si tu veux concaténer, utilise concat correctement :
                        // table = table.concat(data[key][k]); // concat retourne un nouveau tableau
                    });
                }else{
                 
                  //console.log('traller link',trallerLink);
                }
            });
            const newtable = table.filter(
              (value, index, self) => 
                index === self.findIndex((obj) => obj.provider_name === value.provider_name)
            );
            return newtable;
        }
    }
    return table;
}
  function getTime(minutes:number){
    if (!minutes) {
      return ''
    }
    if (minutes < 60) {
      // Si moins de 60 minutes, juste retourner en format "x minute(s)"
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
  
    // Calcul des heures et des minutes restantes
    const hours = Math.floor(minutes / 60);
    //console.log('hours',hours);
    const remainingMinutes = minutes % 60;
    //console.log('remainingMinutes',remainingMinutes);
    // Si aucune minute restante, juste afficher les heures
    if (remainingMinutes === 0) {
      return `${hours} heure${hours !== 1 ? 's' : ''}`;
    }
  
    // Afficher en format "heures:minutes"
    return `${hours} : ${remainingMinutes < 10 ? '0' : ''}${remainingMinutes} minute${hours !== 1 ? 's' : ''}`;
  }
  function getDirector(crew:any[]=[]){
    const data = crew ? crew.filter((c:any)=>c.job === 'Director'): [];
    authorId = data[0]?.id;
    authorName = data[0]?.name;
    return data.map((d)=>d.name);
  }
  function formatGenre(genre:any[]=[]){
    return genre ? genre.map((g)=>g.name) :[];
  }
  function getIdFromAuthor(personData:any[]=[]):number[]{
    let id:number[] = [];
    personData.forEach(p=>{
      //console.log('test',p)
      if(p.name === authorName){
        id.push(p.id);
      }
    })
    return id;
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
            <section>
                <div>
                    <Poster mask={image_base_url+data?.filmDetail?.poster_path} poster={image_base_url+data?.filmDetail?.poster_path} info={info}/>
                    <div className="flex justify-center items-center gap-x-10 relative z-10 mt-3 mb-16 flex-col">
                        <h4 className="bold mb-5 text-yellow mx-5">Toutes les saisons de "{data?.filmDetail.name}" en streaming</h4>
                        <div className="flex justify-center items-center gap-10 relative z-10 flex-wrap">{listSaison}</div>
                    </div>
                </div>
            </section>
            <section>
                <div className="cast mx-auto my-5 w-[90vw] z-10 relative">
                    <h3 className="mb-5 text-white text-[1.6em] bold max-730:text-center max-730:mx-5">Casting Le monde qui nous sépare</h3>
                    <CastComponent castList={castList} responsive={responsive}/>
                </div>
                {
                  traillerLink ? <div className="z-10 relative w-full flex items-center justify-center flex-col"><div><h3 className="mb-5 mt-5 text-white text-[1.6em] bold max-730:text-center max-730:mx-5">Regarder un extrait de cette serie</h3><iframe className="w-[50vw] h-[350px]" src={traillerLink} title={traillerName} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe><h5 className=" text-yellow text-[1.2em] bold my-2">{data?.filmDetail?.name}</h5>
                      <p className="text-second-white mb-5">Trailler</p></div></div> : <div className="trailler mx-auto my-5 w-[90vw] z-10 relative flex flex-col items-center justify-center">
                    <h3 className="mb-5 text-white text-[1.6em] bold max-730:text-center max-730:mx-5">Regarder un extrait de cette serie</h3>
                    <div className="poster cursor-pointer">
                      <img className="w-auto max-700:w-[75vw]" src={image_base_url+data?.filmDetail?.backdrop_path} alt="poster" />
                      <h5 className=" text-yellow text-[1.2em] bold my-2">{data?.filmDetail?.name}</h5>
                      <p className="text-second-white">Trailler</p>
                    </div>
                  </div>
                }
                <div className="my-5 mx-auto w-[90vw] z-10 relative mb-5">
                    <h3 className="text-white text-[1.75em] medium mb-5 max-730:text-center">Service de streaming pour cette serie</h3>
                    <div className="w-[90vw] mx-auto"><ProviderComponent listProvider={listProvider} providerStyle={providerStyle} left=" left-0 " right=" right-0 " movieType="serie"/></div>
                </div>
                <div className="relative mx-auto z-10 w-[100%] mt-[50px] mb-10 flex gap-x-5 items-start max-730:flex-col">
                    <div className="w-[30%] max-730:w-full max-730:mb-10">
                        <h3 className="text-yellow text-[1.75em] ml-[5vw] medium mb-5 max-730:text-center max-730:mx-5">Series qui pourraient aussi vous intéresser</h3>
                        <p className="text-white medium ml-[5vw] max-730:text-center max-730:mx-5">Parcourez les series qui pouraient correspondre à vos critères.</p>
                    </div>
                    <div className="w-[70%] max-730:w-full"><MovieComponent listMovie={listMovie}/></div>
                </div>
                <div className="relative my-5 z-10">
                    <h3 className="text-white text-[1.75em] ml-[5vw] mb-8 max-730:text-center max-730:mx-5">Autre serie avec {authorName ? authorName : actName}</h3>
                    <div className="ml-[5vw] max-730:ml-0">
                        <OtherMovie listMovie={listAuthorMovie}/>
                    </div>
                </div>  
            </section>
        </div>
    )
}