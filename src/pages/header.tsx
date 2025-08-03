import { useEffect, useState } from "react";
import Search from "./search";
import { Link } from "react-router-dom";
import Subheader from "./subheader";

import { options } from "src/constante/data";
import { UseGetTmDbDataCatCombined } from "src/api/film";

const exploreFilm:any[] = [{name:"Films à venir",id:"upcoming"},{name:"Films populaires",id:"popular"},{name:"Films actuellement en salle",id:"now_playing"},{name:"Film mieux noté",id:"top_rated"}];
const exploreTv:any[] = [{name:"Series mieux notés",id:"top_rated"},{name:"Series populaires",id:"popular"},{name:"Series diffuséés aujourd'hui",id:"airing_today"}];
let urlFilm = 'https://api.themoviedb.org/3/genre/movie/list?language=fr';
let urlSerie = 'https://api.themoviedb.org/3/genre/tv/list?language=fr';
let headers = options;
export default function Header() {
    const fullBlack = window.location.href.includes("season") ? true : false;
    const [displayFIlm,setDisplayFilm] = useState('hidden');
    const [displayTv,setDisplayTv] = useState('hidden');
    const [isHeaderIconFilm,setIsHeaderIconFilm] = useState(false);
    const [isHeaderIconTv,setIsHeaderIconTv] = useState(false);
    const [data,setData] = useState<any[]>([])
    const [showNav,setShowNav] = useState(false);
    function shareData(data:any){
        console.log('mydata ',data)
        setShowNav(data.state);
    }

    useEffect(()=>{
        const loadCat = async()=>{
            const {data,loading,error} = await UseGetTmDbDataCatCombined(urlFilm,urlSerie,headers);
            console.log("data",data)
            if (data) {
                setData(data)
            }
        }
        loadCat()
    },[urlFilm,urlSerie])
    if (!data.length) {
        return <div>Probleme lors de la recuperation des données.</div>
    }
    return (
        <header className={`flex items-center justify-between sticky top-0 px-5 py-5 w-full z-20 gap-x-10 ${fullBlack ? 'bg-black' : 'bg-[rgba(0,0,0,.7)]'}`}>
            <span><Link to='/'><img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} className="w-[100px] aspect-square rounded-full max-600:w-[80px]" alt="logo"/></Link></span>
            <div className="navi flex justify-end gap-7 flex-1">
                <div onClick={()=> setShowNav(!showNav)} className="hamburger-lines h-[26px] w-[32px] absolute top-[50%] translate-y-[-50%] right-[80px] flex-col justify-between hidden max-430:flex">
                    <span className={`line line1 h-1 origin-top-left transform transition duration-500 ease-in-out w-full rounded-[10px] bg-white ${showNav?'rotate-[45deg]' : ''}`}></span>
                    <span className={`line line2 h-1 transition duration-500 ease-in-out w-full rounded-[10px] bg-white ${showNav?'scale-y-0':''}`}></span>
                    <span className={`line line1 h-1 origin-[0%_100%] transform transition duration-500 ease-in-out w-full rounded-[10px] bg-white ${showNav?'rotate-[-45deg]' : ''}`}></span>
                </div>  
                <nav className={`flex items-center gap-5 max-430:transition max-430:duration-500 max-430:py-3 max-430:fixed max-430:flex-col max-430:bg-white max-430:w-full max-430:top-0 left-0 max-430:h-[100vh] max-430:translate-x-[-900px] ${showNav ? ' max-430:translate-x-[0px] ' : ''} max-430:justify-start max-430:!items-start max-430:px-5 max-430:overflow-y-auto max-430:z-10`}>
                    <div className=" justify-between items-center gap-2 w-full hidden max-430:flex pointer-events-none max-430:pointer-events-auto">
                        <Link to='/'><img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} className="w-[100px] aspect-square rounded-full max-600:w-[80px]" alt="logo"/></Link>
                        <div className="h-10 w-10 relative cursor-pointer" onClick={()=>{setShowNav(false)}}>
                            <span className="w-8 h-[0.15rem] bg-[#aaa] block absolute left-0 top-1/2" style={{transform:"rotate(-45deg)"}}></span>
                            <span className="w-8 h-[0.15rem] bg-[#aaa] block absolute left-0 top-1/2" style={{transform:"rotate(45deg)"}}></span>
                        </div>
                    </div>
                    <hr className="w-full bg-[#aaa] mb-8 hidden max-430:block"/>
                    <Link onClick={()=>setShowNav(false)} to='/' className="max-430:text-black">Accueil</Link>
                    <div onClick={()=>{setDisplayFilm(displayFIlm === 'block' ? 'hidden':'block');setIsHeaderIconFilm(!isHeaderIconFilm)}} className={isHeaderIconFilm?'div1 cursor-pointer idown relative max-430:text-black':'div1 relative cursor-pointer max-430:text-black'} onMouseOver={(e)=>{setDisplayFilm('block');setIsHeaderIconFilm(true)}} onMouseLeave={(e)=>{setDisplayFilm('hidden');setIsHeaderIconFilm(false)}}>Films<i className="fa fa-angle-up ml-2 text-lg" aria-hidden="true"></i><Subheader type='film' categorie={data?.[0]?.genres ?? null} explore={exploreFilm} display={displayFIlm} shareData={shareData}/></div>
                    <div onClick={()=>{setDisplayTv(displayTv === 'block'?'hidden':'block');setIsHeaderIconTv(!isHeaderIconTv)}} className={isHeaderIconTv?'div2 cursor-pointer idown relative max-430:text-black':'div2 cursor-pointer relative max-430:text-black'} onMouseOver={(e)=>{setDisplayTv('block');setIsHeaderIconTv(true)}} onMouseLeave={(e)=>{setDisplayTv('hidden');setIsHeaderIconTv(false)}}>Series<i className="fa fa-angle-up ml-2 text-lg" aria-hidden="true"></i><Subheader type='serie' categorie={data?.[1]?.genres ?? null} explore={exploreTv} display={displayTv} shareData={shareData}/></div>
                </nav>
                <Search/>
            </div>
        </header>
    )
}