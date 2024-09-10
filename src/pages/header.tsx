import { useState } from "react";
import Search from "./search";
import { Link } from "react-router-dom";
import Subheader from "./subheader";

const categorieFilmTestValue:string[] = ["Action","Animation","Comédie","Crime","Documentaire","Drame","Horreur","Music","Romance","Sci-Fi","Thriller","Western"];
const categorieTvTestValue:string[] = ["Hit TV","Drama TV","True Crime","Reality","News","Sports","Game Shows","History & Science","Comedy","Daytime TV","Movies","Sci-Fi & Action","Chills & Thrills","Classic TV","Food & Home","Black Entertainment","Kids & Family","Lifestyle","Music","Nature & Travel","Anime & Gaming","International"];
const exploreFilm:any[] = [{name:"Films à venir",id:"upcoming"},{name:"Films populaires",id:"popular"},{name:"Films actuellement en salle",id:"now_playing"},{name:"Film mieux noté",id:"top_rated"}];
const exploreTv:any[] = [{name:"Series mieux notés",id:"top_rated"},{name:"Series populaires",id:"popular"},{name:"Series diffuséés aujourd'hui",id:"airing_today"}];
export default function Header() {
    const [displayFIlm,setDisplayFilm] = useState('hidden');
    const [displayTv,setDisplayTv] = useState('hidden');
    const [isHeaderIconFilm,setIsHeaderIconFilm] = useState(false);
    const [isHeaderIconTv,setIsHeaderIconTv] = useState(false);
    const [showNav,setShowNav] = useState(false);
    function shareData(data:any){
        console.log('mydata ',data)
        if (data.type === 'filme') {
            setShowNav(data.state);
        }else{
            setShowNav(data.state);
        }
    }
    return (
        <header className="flex items-center justify-between sticky bg-black px-5 py-5 w-full z-20">
            <span><Link to='/'>LOGO</Link></span>
            <div className="navi flex justify-between gap-7">
                <div onClick={()=> setShowNav(!showNav)} className="hamburger-lines h-[26px] w-[32px] absolute top-[27px] right-[80px] flex-col justify-between hidden max-430:flex">
                    <span className={`line line1 h-1 origin-top-left transform transition duration-500 ease-in-out w-full rounded-[10px] bg-white ${showNav?'rotate-[45deg]' : ''}`}></span>
                    <span className={`line line2 h-1 transition duration-500 ease-in-out w-full rounded-[10px] bg-white ${showNav?'scale-y-0':''}`}></span>
                    <span className={`line line1 h-1 origin-[0%_100%] transform transition duration-500 ease-in-out w-full rounded-[10px] bg-white ${showNav?'rotate-[-45deg]' : ''}`}></span>
                </div>  
                <nav className={`flex items-center gap-5 max-430:transition max-430:duration-500 max-430:py-3 max-430:absolute max-430:flex-col max-430:bg-white max-430:w-full max-430:top-[80px] left-0 max-430:translate-x-[-900px] ${showNav ? ' max-430:translate-x-[0px] ' : ''} max-430:justify-start max-430:!items-start max-430:pl-5`}>
                    <Link onClick={()=>setShowNav(!showNav)} to='/' className="max-430:text-black">Accueil</Link>
                    <div onClick={()=>{setDisplayFilm(displayFIlm === 'block' ? 'hidden':'block');setIsHeaderIconFilm(!isHeaderIconFilm)}} className={isHeaderIconFilm?'idown relative max-430:text-black':'relative max-430:text-black'} onMouseOver={(e)=>{setDisplayFilm('block');setIsHeaderIconFilm(true)}} onMouseLeave={(e)=>{setDisplayFilm('hidden');setIsHeaderIconFilm(false)}}>Filmes<i className="fa fa-angle-up ml-2 text-lg" aria-hidden="true"></i><Subheader type='filme' categorie={categorieFilmTestValue} explore={exploreFilm} display={displayFIlm} shareData={shareData}/></div>
                    <div onClick={()=>{setDisplayTv(displayTv === 'block'?'hidden':'block');setIsHeaderIconTv(!isHeaderIconTv)}} className={isHeaderIconTv?'idown relative max-430:text-black':'relative max-430:text-black'} onMouseOver={(e)=>{setDisplayTv('block');setIsHeaderIconTv(true)}} onMouseLeave={(e)=>{setDisplayTv('hidden');setIsHeaderIconTv(false)}}>Series<i className="fa fa-angle-up ml-2 text-lg" aria-hidden="true"></i><Subheader type='serie' categorie={categorieTvTestValue} explore={exploreTv} display={displayTv} shareData={shareData}/></div>
                </nav>
                <Search/>
            </div>
        </header>
    )
}