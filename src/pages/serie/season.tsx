import { Link, useParams } from "react-router-dom";
import CastComponent from "../utils/cast-component";

import Cast from "../utils/cast";

import PostSerie from "../utils/post-serie";

import { options,image_base_url } from "src/constante/data";
import { getDirector, formatGenre, getTime } from "src/util-function/fontions";
import { useEffect, useMemo, useState } from "react";
import { UseGetTmDbData, UseTVShowsWithCurrentSeason } from "src/api/film";

export default function Season(){
    const {id,season_id} = useParams();
    console.log('season_id',season_id)
    const [epList,setEpiList] = useState<any[]>([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState<unknown>(null);
    const [data,setData] = useState<any>(null)
    const [seasonList,setSeasonList] = useState<any[]>([])
    const [lastAddedSerie,setLastAddedSerie] = useState<any[]>([])
    const [loading1,setLoading1] = useState(true);
    const [error1,setError1] = useState<unknown>(null);
    const actuelSeason = season_id ? parseInt(season_id):0;
    const urlSerie = `https://api.themoviedb.org/3/tv/${id}?language=fr-FR&append_to_response=credits,videos,images`;
    const headers = options;
    
    
    const urlLastestSerieAdded = "https://api.themoviedb.org/3/tv/on_the_air?language=fr-FR&page=1";
    
    //console.log('season data',lastSerie);
    
    const numSea = data?.number_of_seasons;
    const epNum = data?.number_of_episodes;
    const cast = data?.credits.cast;
    const crew = data?.credits.crew;
    const percentFomTen = (value:number)=>{
      return value * 100 / 10
    }
    const serieInfo = {
        name : data?.name,
        year : data?.last_air_date.split('-')[0],
        director : getDirector(crew).join(', '),
        genre : formatGenre(data?.genres).join(', '),
        rate : data?.vote_average,
        country : data?.origin_country.join(','),
        shortDes : data?.overview.split(' ',52).join(' '),
        description : data?.overview,
        time : getTime(data?.episode_run_time[0]),
        unlike : (100 - percentFomTen(data?.vote_average)).toFixed(2)+"%",
        like : percentFomTen(data?.vote_average)+"%",
        classUnlike : (100 - percentFomTen(data?.vote_average)).toFixed(2),
        classLike : percentFomTen(data?.vote_average),
        vote_count : data?.vote_count
    }
    const castList = cast?.map((c:any,index:number)=>{
        return <Cast key={c.name+'_'+index} castData={c}/>
    })
   
    const epData = useMemo(()=>{
      let itemList = [];
      for (let i = 0; i < epNum; i++) {
        const item = <div key={i} className={'bg-[#2b2c2d] p-2 text-center box-border rounded-xl hover:border-b-[1px] hover:border-b-yellow'}><Link className="text-yellow" to={'episode/'+(i+1)}>Episode {i+1}</Link></div>;
        itemList.push(item);
      }
      return itemList;
    },[epNum])
    
    const seasData = useMemo(()=>{
      let itemList:any = [];
      for (let i = 0; i < numSea; i++) {
        let htmlEl = (i+1) === actuelSeason ? <div className='w-[185px]'>
        <div className={(i+1) === actuelSeason ? 'active-season relative': 'relative'}>
            <img className="w-full" src={image_base_url+data?.poster_path} alt={data?.original_title ? data?.original_title : data?.name} />
            {
                (i+1) === actuelSeason && <span className="absolute top-[50%] block text-center w-full text-[.8em] left-[50%] translate-x-[-50%] translate-y-[-50%]">Tu vois cette saison</span>
            }
        </div>
        <span className="text-white medium text-center mt-3 block">Saison {i+1}</span>
        </div> : <Link to={'../serie/'+id+'/season/'+(i+1)} className='w-[185px]'>
            <div className={(i+1) === actuelSeason ? 'active-season relative': 'relative'}>
                <img className="w-full" src={image_base_url+data?.poster_path} alt={data?.original_title ? data?.original_title : data?.name} />
                {
                    (i+1) === actuelSeason && <span className="absolute top-[50%] block text-center w-full text-[.8em] left-[50%] translate-x-[-50%] translate-y-[-50%]">Tu vois cette saison</span>
                }
            </div>
            <span className="text-white medium text-center mt-3 block">Saison {i+1}</span>
        </Link>
        itemList.push(htmlEl)
      }
      return itemList;
    },[numSea])

    useEffect(()=>{
      setEpiList(epData);
      setSeasonList(seasData)
    },[epData,seasData])
    useEffect(()=>{
      const loadSeason = async()=>{
        const {data,error,loading} = await UseGetTmDbData(urlSerie,headers);
        const detail = data ? data : null;
        console.log("seaison",data)
        setData(detail);
        setError(error);
        setLoading(loading);
      }
      const loadLastSerieData = async()=>{
        const {data,error,loading} = await UseTVShowsWithCurrentSeason(urlLastestSerieAdded,headers)
        if (data) {
          setLastAddedSerie(data)
        }
        setError1(error)
        setLoading1(loading)
      }
      loadSeason()
      loadLastSerieData()
    },[urlLastestSerieAdded,urlSerie])
    console.log('seasData',seasonList,seasData)
    const responsive = [
        {
          breakpoint: 2500,
          settings: {
            slidesToShow: 9,
          }
        },
        {
            breakpoint: 1820,
            settings: {
              slidesToShow: 8,
            }
          },
        {
            breakpoint: 1638,
            settings: {
              slidesToShow: 7,
            }
          },
        {
          breakpoint: 1456,
          settings: {
            slidesToShow: 6,
          }
        },
        {
          breakpoint: 1274,
          settings: {
            slidesToShow: 5,
          }
        },
        {
            breakpoint: 1092,
            settings: {
              slidesToShow: 4,
            }
        },
        {
            breakpoint: 910,
            settings: {
              slidesToShow: 3,
            }
        },
        {
            breakpoint: 885,
            settings: {
              slidesToShow: 5,
            }
        },
        {
            breakpoint: 750,
            settings: {
              slidesToShow: 4,
            }
        },
        {
            breakpoint: 610,
            settings: {
              slidesToShow: 3,
            }
        },
        {
            breakpoint: 450,
            settings: {
              slidesToShow: 2,
            }
        },
        {
          breakpoint: 350,
          settings: {
            slidesToShow: 1,
          }
      }
    ]
    return (
        <div className="w-[100%] mx-auto flex max-885:flex-col">
            <div className="w-[20%] bg-black max-885:w-full">
                <h4 className="text-yellow text-center mb-10 bg-[#0c0c0c] py-4 px-2">DERNIERS ÉPISODES AJOUTÉS</h4>
                <div className="flex gap-y-5 flex-col mx-5 max-885:flex-row max-885:flex-wrap max-885:gap-x-5 max-885:mx-5 max-885:justify-center max-885:mb-10">
                    {
                        !loading1 ? !error1 ? lastAddedSerie?.map((l:any,i:number)=>{
                            return(
                                <Link key={i+"_"+l.details.original_title ? l.details.original_title : l.details.name+"_"+i} to={'../serie/'+l.details.id}>
                                  <div className="flex justify-start items-start gap-5 max-885:flex-col">
                                    <img className="w-[80px] h-[80px] object-cover" src={image_base_url+l.details.poster_path} alt={l.details.original_title ? l.details.original_title : l.details.name} />
                                    <div className="flex-1">
                                        <h6 className="text-yellow text-[.9em] bold">{l.details.original_title ? l.details.original_title : l.details.name}</h6>
                                        <span className="text-primaire-white text-[.65em] medium">Saison <span className="text-red-700 mr-2 regular">{l.details.number_of_seasons}</span></span>
                                        <span className="text-primaire-white text-[.65em] medium">Episode <span className="text-red-700 regular">{l.details.last_episode_to_air.episode_number}</span></span>
                                    </div>
                                  </div>
                                </Link>
                            )
                        }): <div className="w-full"><p className="text-center z-10 relative">Données indisponible pour le moment</p></div> : <div className="w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>
                    }
                </div>
            </div>
            <div className="w-[80%] bg-[#1a1a1a] max-885:w-full">
                <div className="relative">
                  {
                    !loading ? !error ? <PostSerie backImg={image_base_url+data?.poster_path} seriePostUrl={image_base_url+data?.poster_path} serieInfo={serieInfo}/> : <div className="w-full"><p className="text-center z-10 relative">Données indisponible pour le moment</p></div> : <div className="w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>
                  }
                </div>
                <div className="cast my-10 z-10 relative mx-10">
                    <h3 className=" text-yellow text-[1.6em] bold mb-10 max-480:text-center">Casting de {data?.original_title ? data?.original_title : data?.name}</h3>
                    <div className="w-[100%] max-885:w-full">
                      {
                        !loading ? !error ? <CastComponent castList={castList} responsive={responsive}/> : <div className="w-full"><p className="text-center z-10 relative">Données indisponible pour le moment</p></div> : <div className="w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>
                      }
                      </div>
                </div>
                <div className="m-10">
                    <h3 className="text-yellow text-[1.6em] mb-10 bold max-480:text-center">Voir tous les épisodes disponibles de {data?.original_title ? data?.original_title : data?.name} saison {season_id }</h3>
                    <div className="flex items-center justify-center flex-wrap gap-3 max-h-[400px] overflow-y-auto">{epList.length > 0 ? !error ? epList : (<div className="w-full"><p className="text-center z-10 relative">Données indisponible pour le moment</p></div>) : (<div className="w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>) }</div>
                </div>
                <div className="mx-10 mb-20">
                    <h3 className="text-yellow text-[1.6em] mb-5 bold max-480:text-center">Autres Saisons en Streaming Gratuit</h3>
                    <hr className="border-b-white mb-3"/>
                    <div className="flex gap-10 items-center justify-center mt-5 flex-wrap">
                        {
                          seasonList.length > 0 ? !error ? seasonList : <div className="w-full"><p className="text-center z-10 relative">Données indisponible pour le moment</p></div> : <div className="w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}