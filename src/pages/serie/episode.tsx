import { Link, useParams } from "react-router-dom";
import PostSerie from "../utils/post-serie";

import { useEffect, useMemo, useRef, useState } from "react";
import { UseNavigateTo } from "../../hooks/pages-hook";
import { UseGetTmDbDataCombined } from "src/hooks/pages-hook";
import { options,image_base_url } from "src/constante/data";
import { getDirector, formatGenre, getTime, mapToTable } from "src/util-function/fontions";

export default function Episode(){
    let {id,season_id,ep_id} = useParams();
    const myid = ep_id ? parseInt(ep_id) : 0;
    const myseason = season_id ? parseInt(season_id) : 0;
    const [epList,setEpiList] = useState<any[]>([]);
    const seasonList = [];
    const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState(myid);
    const [currentSeasonNumber, setCurrentSeasonNumber] = useState(myseason);
    const [activeProvider, setActiveProvider] = useState(-1);
    const [isActiveNav, setIsActiveNav] = useState(false);
    const shouldNavigate = useRef('false');
    const urlSerie = `https://api.themoviedb.org/3/tv/${id}?language=fr-FR&append_to_response=credits,videos,images`;
    const headers = options;
    const urlFilmProvider = `https://api.themoviedb.org/3/tv/${id}/season/${season_id}/watch/providers?append_to_response=videos`;
  
    const {data,error,loading} = UseGetTmDbDataCombined(urlSerie,urlFilmProvider,headers);
    const crew = data?.filmDetail?.credits.crew;
    const seriname = data?.filmDetail?.original_title ? data?.filmDetail?.original_title : data?.filmDetail?.name;
    const seasonNumber = data?.filmDetail.number_of_seasons;
    const epNum = data?.filmDetail.number_of_episodes;
    const provider = mapToTable(data?.filmProvider.results);
    console.log('provider',provider);
    const [currentProviderUrl, setCurrentProviderUrl] = useState('');
    const [currentProviderName, setCurrentProviderName] = useState("");
    const serieInfo = {
        name : data?.filmDetail?.original_title ? data?.filmDetail?.original_title : data?.filmDetail?.name,
        year : data?.filmDetail?.last_air_date.split('-')[0],
        director : getDirector(crew).join(', '),
        genre : formatGenre(data?.filmDetail?.genres).join(', '),
        rate : data?.filmDetail?.vote_average,
        country : data?.filmDetail?.origin_country.join(','),
        shortDes : data?.filmDetail?.overview.split(' ',52).join(' '),
        description : data?.filmDetail?.overview,
        time : getTime(data?.filmDetail?.episode_run_time[0]),
        unlike : "5%",
        like : "95%",
        classUnlike : "w-[5%]",
        classLike : "w-[95%]",
    }
    const epData = useMemo(()=>{
        let listItem:any = [];
        for (let i = 0; i < epNum; i++) {
            listItem.push(<div onClick={()=>{setIsActiveNav(false);setCurrentEpisodeNumber(i+1)}} key={`episode-${i+1}`} className={`max-885:mx-3 max-885:my-2 p-4 text-left box-border hover:border-b-[1px] hover:border-b-yellow ${i % 2 !== 0 ? 'bg-[#2b2c2d]' : ''} ${(i+1) === myid ? 'ep-active' : ''}`}><Link className="text-yellow" to={`../serie/${id}/season/${season_id}/episode/${i+1}`}>{data?.filmDetail?.original_title ? data?.filmDetail?.original_title : data?.filmDetail?.name} {season_id} épisode {i+1}</Link></div>)
        }
        return listItem;
    },[epNum])
    useEffect(()=>{
        setEpiList(epData)
    },[epData])
    for (let i = 0; i < seasonNumber; i++) {
        seasonList.push(<option key={`season-${i+1}`} value={i+1}>Saison {i+1}</option>)
    }
    function optionNavigate(seasonId:string){
        setCurrentSeasonNumber(parseInt(seasonId));
        setCurrentEpisodeNumber(1);
        shouldNavigate.current = 'season';
        setIsActiveNav(true);
    }
    function navigateSlide(position:string){
        if (position === 'prev') {
            currentEpisodeNumber > 1 && setCurrentEpisodeNumber((ep) => ep - 1);
        }else{
            currentEpisodeNumber < epNum && setCurrentEpisodeNumber(currentEpisodeNumber + 1);
        }
        shouldNavigate.current = 'epi';
        setIsActiveNav(true);
    }
    const url = shouldNavigate.current === 'epi' ? `serie/${id}/season/${currentSeasonNumber}/episode/${currentEpisodeNumber}` : `serie/${id}/season/${currentSeasonNumber}/episode/1`;
    UseNavigateTo(url,isActiveNav);
    
    return (
        <div className="w-[100%] mx-auto flex max-885:flex-col">
            <div className="w-[25%] bg-black max-885:w-full max-885:pb-10">
                <h4 className="text-white text-center py-5">{data?.filmDetail?.original_title ? data?.filmDetail?.original_title : data?.filmDetail?.name} {currentSeasonNumber}</h4>
                <div className="flex flex-col max-885:flex-row max-885:justify-center max-885:flex-wrap max-885:mx-5">
                    {
                        epList.length > 0 ? !error ? epList : <div className="w-full"><p className="text-center z-10 relative">Données indisponible pour le moment</p></div> : <div className="w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>
                    }
                </div>
            </div>
            <div className="flex-1 bg-[#1a1a1a]">
                <div className="relative">
                    {
                        !loading ? !error ? <PostSerie backImg={image_base_url+data?.filmDetail.poster_path} seriePostUrl={image_base_url+data?.filmDetail.poster_path} serieInfo={serieInfo}/> : <div className="w-full"><p className="text-center z-10 relative my-5">Données indisponible pour le moment</p></div> : <div className="my-5 w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>
                    }
                </div>
                {
                    !error ? (
                        <div className="mx-10">
                            <div className="px-5 py-2 bg-yellow text-black float-left max-600:float-none max-600:mb-4">Actuel provider {currentProviderName}</div>
                            <div className="px-5 py-2 bg-yellow text-black float-right max-600:float-none">Vous regardez l'episode {ep_id} et la saison {season_id} de {seriname ? seriname.split(' ',8).join(' ') : ''} ...</div>
                            {
                                currentProviderUrl ? <div className="bg-black w-full h-[350px] flex items-center justify-center"><Link className="bg-yellow text-black flex items-center justify-center py-3 px-4" to={currentProviderUrl}>Cliquer pour se rediriger vers le provider</Link></div> : <div className="w-full h-[350px] flex items-center justify-center text-center text-white bg-black text-[2.5em]max-600:text-[1.7em] max-600:h-[250px]">Aucune video disponible pour ce provider</div>
                            }
                            <div className="mt-3 flex justify-between items-center max-430:flex-col gap-4">
                                {
                                    currentEpisodeNumber > 1 ? <div className="max-430:w-full px-5 py-2 bg-yellow text-black cursor-pointer" onClick={()=>{navigateSlide('prev')}}>Précedent</div> : <div className="w-[120px]"></div>
                                }
                                <select defaultValue={currentSeasonNumber} className="max-430:w-full px-5 py-2 bg-yellow text-black" name="" id="" onChange={(e)=>{optionNavigate(e.target.value)}}>{seasonList}</select>
                                {
                                    currentEpisodeNumber < epNum ? <div className="max-430:w-full px-5 py-2 bg-yellow text-black cursor-pointer" onClick={()=>{navigateSlide('next')}}>Suivant</div> : <div className="w-[120px]"></div>
                                }
                            </div>
                        </div>
                    ) : ('')
                }
                {
                    !error ? (
                        <div>
                            <h3 className="text-white bold ml-10 mt-10">Liste de providers</h3>
                            <div className="m-10">
                                <ul className="m-0 p-0">
                                {
                                    provider.map((p:any,index:number)=>{
                                        return (
                                            <li onClick={()=>{setCurrentProviderUrl(p.link?p.link:"");setCurrentProviderName(p.provider_name);setActiveProvider(index)}} className="flex justify-start items-center mb-3 cursor-pointer bg-[#2b2c2d] p-3 flex-wrap gap-5" key={`provider-${index+1}`}><span>Lien : {index+1}</span> <div className="flex justify-start items-center gap-x-2 w-[60%]"><img className="w-[35px]" src={image_base_url+p.logo_path} alt="provider" /> <span>{p.provider_name}</span></div> <div className="flex flex-col items-center justify-center"><span>Qualité HD</span>{activeProvider === index && <em className="bg-green-600 px-[5px] py-[2px] text-[.65em] text-white rounded-xl not-italic">active provider</em>}</div> <span className="block text-right">Ajouté le 20/02/2025</span></li>
                                        )
                                    })
                                }
                                </ul>
                            </div>
                        </div>
                    ) : ('')
                }
            </div>
        </div>
    )
}