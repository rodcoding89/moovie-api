import { Link, useParams } from "react-router-dom";
import PostSerie from "../utils/post-serie";
import { serieInfo } from "./season";
import { useRef, useState } from "react";
import { UseNavigateTo } from "../../hooks/pages-hook";

const profiderList:any[] = [{link:'assets/images/provider.webp',name:'Netflix',quality:'HD',date:'20/02/2025',url:'https://www.youtube.com/embed/FxkVDz_JlUE?si=IStHHj0NVOWDk_Hh'},{link:'assets/images/provider.webp',name:'Netflix',quality:'HD',date:'20/02/2025',url:'https://www.youtube.com/embed/FxkVDz_JlUE?si=IStHHj0NVOWDk_Hh'},{link:'assets/images/provider.webp',name:'Netflix',quality:'HD',date:'20/02/2025',url:'https://www.youtube.com/embed/FxkVDz_JlUE?si=IStHHj0NVOWDk_Hh'},{link:'assets/images/provider.webp',name:'Netflix',quality:'HD',date:'20/02/2025',url:''},{link:'assets/images/provider.webp',name:'Netflix',quality:'HD',date:'20/02/2025',url:'https://www.youtube.com/embed/FxkVDz_JlUE?si=IStHHj0NVOWDk_Hh'},{link:'assets/images/provider.webp',name:'Netflix',quality:'HD',date:'20/02/2025',url:'https://www.youtube.com/embed/FxkVDz_JlUE?si=IStHHj0NVOWDk_Hh'},{link:'assets/images/provider.webp',name:'Netflix',quality:'HD',date:'20/02/2025',url:''},{link:'assets/images/provider.webp',name:'Netflix',quality:'HD',date:'20/02/2025',url:'https://www.youtube.com/embed/FxkVDz_JlUE?si=IStHHj0NVOWDk_Hh'},{link:'assets/images/provider.webp',name:'Netflix',quality:'HD',date:'20/02/2025',url:'https://www.youtube.com/embed/FxkVDz_JlUE?si=IStHHj0NVOWDk_Hh'},{link:'assets/images/provider.webp',name:'Netflix',quality:'HD',date:'20/02/2025',url:'https://www.youtube.com/embed/FxkVDz_JlUE?si=IStHHj0NVOWDk_Hh'},{link:'assets/images/provider.webp',name:'Netflix',quality:'HD',date:'20/02/2025',url:''},{link:'assets/images/provider.webp',name:'Netflix',quality:'HD',date:'20/02/2025',url:'https://www.youtube.com/embed/FxkVDz_JlUE?si=IStHHj0NVOWDk_Hh'},{link:'assets/images/provider.webp',name:'Netflix',quality:'HD',date:'20/02/2025',url:'https://www.youtube.com/embed/FxkVDz_JlUE?si=IStHHj0NVOWDk_Hh'},{link:'assets/images/provider.webp',name:'Netflix',quality:'HD',date:'20/02/2025',url:'https://www.youtube.com/embed/FxkVDz_JlUE?si=IStHHj0NVOWDk_Hh'}];
export default function Episode(){
    let {id,season_id,ep_id} = useParams();
    const myid = ep_id ? parseInt(ep_id) : 0;
    const myseason = season_id ? parseInt(season_id) : 0;
    const epNum = 30;
    const seriname = "Quantico";
    const seasonNumber = 3;
    const epList = [];
    const seasonList = [];
    const [currentProviderUrl, setCurrentProviderUrl] = useState('');
    const [currentProviderName, setCurrentProviderName] = useState('');
    const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState(myid);
    const [currentSeasonNumber, setCurrentSeasonNumber] = useState(myseason);
    const [activeProvider, setActiveProvider] = useState(-1);
    const [isActiveNav, setIsActiveNav] = useState(false);
    const shouldNavigate = useRef('false');
    for (let i = 0; i < epNum; i++) {
        epList.push(<div onClick={()=>{setIsActiveNav(false);setCurrentEpisodeNumber(i+1)}} key={`episode-${i+1}`} className={`p-2 text-center box-border hover:border-b-[1px] hover:border-b-yellow ${i % 2 !== 0 ? 'bg-[#2b2c2d]' : ''} ${(i+1) === myid ? 'ep-active' : ''}`}><Link className="text-yellow" to={`../serie/${id}/season/${season_id}/episode/${i+1}`}>Quantico Saison {season_id} épisode {i+1}</Link></div>)
    }
    for (let i = 0; i < seasonNumber; i++) {
        seasonList.push(<option key={`season-${i+1}`} selected={currentSeasonNumber === i + 1} value={i+1}>Saison {i+1}</option>)
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
    
    console.log('current episode',currentEpisodeNumber);
    return (
        <div className="w-[100%] mx-auto flex">
            <div className="w-[25%] bg-black">
                <h4 className="text-white text-center py-5">Quantico Saison {currentSeasonNumber}</h4>
                <div className="flex flex-col">
                    {
                        epList
                    }
                </div>
            </div>
            <div className="flex-1 bg-[#1a1a1a]">
                <div className="relative">
                    <PostSerie backImg={process.env.PUBLIC_URL+'/assets/images/photo.avif'} seriePostUrl={process.env.PUBLIC_URL+'/assets/images/twister.webp'} serieInfo={serieInfo}/>
                </div>
                <div className="mx-10">
                    <div className="px-5 py-2 bg-yellow text-black float-left">Actuel provider {currentProviderName}</div>
                    <div className="px-5 py-2 bg-yellow text-black float-right">Vous regardez l'episode {ep_id} et la saison {season_id} de {seriname}</div>
                    {
                        currentProviderUrl ? <iframe className="w-full h-[350px]" src={currentProviderUrl} title={currentProviderName} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> : <div className="w-full h-[450px] flex items-center justify-center text-white bg-black text-[2.5em]">Aucune video disponible pour ce provider</div>
                    }
                    <div className="mt-3 flex justify-between items-center">
                        {
                            currentEpisodeNumber > 1 ? <div className="px-5 py-2 bg-yellow text-black cursor-pointer" onClick={()=>{navigateSlide('prev')}}>Précedent</div> : <div className="w-[120px]"></div>
                        }
                        <select className="px-5 py-2 bg-yellow text-black" name="" id="" onChange={(e)=>{optionNavigate(e.target.value)}}>{seasonList}</select>
                        {
                            currentEpisodeNumber < epNum ? <div className="px-5 py-2 bg-yellow text-black cursor-pointer" onClick={()=>{navigateSlide('next')}}>Suivant</div> : <div className="w-[120px]"></div>
                        }
                    </div>
                </div>
                <div>
                    <h3 className="text-white bold ml-10 mt-10">Liste de providers</h3>
                    <div className="m-10">
                        <ul className="m-0 p-0">
                        {
                            profiderList.map((p:any,index:number)=>{
                                return (
                                    <li onClick={()=>{setCurrentProviderUrl(p.url);setCurrentProviderName(p.name);setActiveProvider(index)}} className="flex justify-between items-center mb-3 cursor-pointer bg-[#2b2c2d] p-3" key={`provider-${index+1}`}><span>Lien : {index+1}</span> <div className="flex justify-start items-center gap-x-2"><img className="w-[35px]" src={process.env.PUBLIC_URL+'/'+p.link} alt="provider" /> <span>{p.name}</span></div> <div className="flex flex-col items-center justify-center"><span>Qualité {p.quality}</span>{activeProvider === index && <em className="bg-green-600 px-[5px] py-[2px] text-[.65em] text-white rounded-xl not-italic">active provider</em>}</div> <span>Ajouté le {p.date}</span></li>
                                )
                            })
                        }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}