import { Link, useParams } from "react-router-dom";
import PostSerie from "../utils/post-serie";

import { useEffect, useMemo, useRef, useState } from "react";
import { UseNavigateTo } from "../../hooks/pages-hook";

import { options,image_base_url } from "src/constante/data";
import { getDirector, formatGenre, getTime, mapToTable } from "src/util-function/fontions";
import { UseGetTmDbDataCombined } from "src/api/film";

export default function Episode(){
    let {id,season_id,ep_id} = useParams();
    const myid = ep_id ? parseInt(ep_id) : 0;
    const myseason = season_id ? parseInt(season_id) : 0;
    const [epList,setEpiList] = useState<any[]>([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState<unknown>(null);
    const seasonList = [];
    const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState(myid);
    const [currentSeasonNumber, setCurrentSeasonNumber] = useState(myseason);
    const [activeProvider, setActiveProvider] = useState(-1);
    const [isActiveNav, setIsActiveNav] = useState(false);
    const [serieName,setSerieName] = useState('')
    const [data,setData] = useState<any>(null);
    const shouldNavigate = useRef('false');
    const urlSerie = `https://api.themoviedb.org/3/tv/${id}?language=fr-FR&append_to_response=credits,videos,images`;
    const headers = options;
    const urlFilmProvider = `https://api.themoviedb.org/3/tv/${id}/season/${season_id}/watch/providers?append_to_response=videos`;
    const [provider,setProvider] = useState<any[]>([])
    const crew = data?.credits.crew;
    const seriname = data?.original_title ? data?.original_title : data?.name;
    const seasonNumber = data?.number_of_seasons;
    const epNum = data?.number_of_episodes;
    const providerRef = useRef<HTMLDivElement>(null)
    console.log('provider',provider);
    const [currentProviderUrl, setCurrentProviderUrl] = useState(``);
    const [currentProviderName, setCurrentProviderName] = useState("");
    const [currentProviderLogo, setCurrentProviderLogo] = useState("");
    const percentFomTen = (value:number)=>{
        return value * 100 / 10
    }
    const serieInfo = {
        name : data?.original_title ? data?.original_title : data?.name,
        year : data?.last_air_date.split('-')[0],
        director : getDirector(crew).join(', '),
        genre : formatGenre(data?.genres).join(', '),
        rate : data?.vote_average,
        country : data?.origin_country.join(','),
        shortDes : data?.overview.split(' ',52).join(' '),
        description : data?.overview,
        time : getTime(data?.episode_run_time[0]),
        unlike : (100 - percentFomTen(data?.vote_average)).toFixed(2)+"%",
        like : percentFomTen(data?.vote_average).toFixed(2)+"%",
        classUnlike : (100 - percentFomTen(data?.vote_average)).toFixed(2),
        classLike : percentFomTen(data?.vote_average).toFixed(2),
        vote_count : data?.vote_count
    }
    const epData = useMemo(()=>{
        let listItem:any = [];
        for (let i = 0; i < epNum; i++) {
            listItem.push(<div onClick={()=>{setIsActiveNav(false);setCurrentEpisodeNumber(i+1)}} key={`episode-${i+1}`} className={`max-885:mx-3 max-885:my-2 p-4 text-left box-border hover:border-b-[1px] hover:border-b-yellow ${i % 2 !== 0 ? 'bg-[#2b2c2d]' : ''} ${(i+1) === myid ? 'ep-active' : ''}`}><Link className="text-yellow" to={`../serie/${id}/season/${season_id}/episode/${i+1}`}>{data?.original_title ? data?.original_title : data?.name} {season_id} épisode {i+1}</Link></div>)
        }
        return listItem;
    },[epNum])
    useEffect(()=>{
        setEpiList(epData)
    },[epData])
    useEffect(()=>{
        const loadEpisode = async()=>{
            const {data,error,loading} = await UseGetTmDbDataCombined(urlSerie,urlFilmProvider,headers);
            console.log("episode",data)
            const film = data ? data[0] : null
            const seriname = film?.original_title ? film?.original_title : film?.name;
            setSerieName(seriname)
            const filmProvider = data ? data[1] : []
            setData(film)
            setError(error)
            setLoading(loading)
            setProvider((prev)=>{
                return mapToTable(filmProvider.results);
            })
        }
        loadEpisode()
    },[urlSerie,urlFilmProvider])
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
        <div className="w-[100%] mx-auto flex max-885:flex-col mt-[120px]">
            <div className="w-[25%] bottom-0 bg-black max-885:w-full max-885:pb-10 max-885:relative">
                <h4 className="text-white text-center py-5 h-[64px] bg-[#1a1a1a]">{data?.original_title ? data?.original_title : data?.name} {currentSeasonNumber}</h4>
                <div className="flex max-h-[1600px] gap-y-5 flex-col px-5 max-885:items-start max-885:gap-x-5 max-885:px-5 py-5 max-885:justify-center max-885:mb-10 overflow-y-auto max-885:h-[400px]">
                    {
                        epList.length > 0 ? !error ? epList : <div className="w-full"><p className="text-center z-10 relative">Données indisponible pour le moment</p></div> : <div className="w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>
                    }
                </div>
            </div>
            <div className="flex-1 bg-[#1a1a1a] ">
                <div className="relative">
                    {
                        !loading ? !error ? <PostSerie backImg={image_base_url+data?.poster_path} seriePostUrl={image_base_url+data?.poster_path} serieInfo={serieInfo}/> : <div className="w-full"><p className="text-center z-10 relative my-5">Données indisponible pour le moment</p></div> : <div className="my-5 w-full flex items-center justify-center"><div className='loader after:!border-t-transparent after:!border-b-white after:!border-l-white after:!border-r-white'></div></div>
                    }
                </div>
                {
                    !error ? (
                        <div className="mx-10 relative" ref={providerRef}>
                            <div className="px-5 py-2 bg-yellow text-black float-left max-600:float-none max-600:mb-4">Actuel provider {currentProviderName}</div>
                            <div className="px-5 py-2 bg-yellow text-black float-right max-600:float-none">Vous regardez l'episode {ep_id} et la saison {season_id} de {serieName.split(' ',8).join(' ') ?? ""} ...</div>
                            {
                                currentProviderUrl !== '' ? <div className="bg-black w-full h-[350px] flex items-center justify-center relative"><Link className="bg-yellow text-black flex items-center justify-center py-3 px-4" to={currentProviderUrl} target="_blanc">Cliquer pour se rediriger vers le provider</Link>{currentProviderLogo !== '' ? <img className="w-[35px] h-auto absolute top-5 left-5" src={image_base_url+currentProviderLogo} alt="provider" /> : ''}</div> : <div className="w-full h-[350px] flex items-center justify-center text-center text-white bg-black text-[2.5em]max-600:text-[1.7em] max-600:h-[250px]">Veuillez selectionner un provider pour visionner le thriller</div>
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
                                            <li onClick={()=>{setCurrentProviderName(p.provider_name);setActiveProvider(index);providerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });setCurrentProviderLogo(p.logo_path);setCurrentProviderUrl(`https://www.themoviedb.org/tv/${id}-${serieName?.toLowerCase().replaceAll(" ","-")}/watch`)}} className="flex justify-start items-center mb-3 cursor-pointer bg-[#2b2c2d] p-3 flex-wrap gap-5" key={`provider-${index+1}`}><span>Lien : {index+1}</span> <div className="flex justify-start items-center gap-x-2 w-[60%]"><img className="w-[35px]" src={image_base_url+p.logo_path} alt="provider" /> <span>{p.provider_name}</span></div> <div className="flex flex-col items-center justify-center"><span>Qualité HD</span>{activeProvider === index && <em className="bg-green-600 px-[5px] py-[2px] text-[.65em] text-white rounded-xl not-italic">active provider</em>}</div> <span className="block text-right">Ajouté le 20/02/2025</span></li>
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