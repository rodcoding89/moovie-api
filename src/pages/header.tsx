import { useState } from "react";
import Search from "./search";
import { Link } from "react-router-dom";
import Subheader from "./subheader";

const categorieFilmTestValue:string[] = ["Action","Animation","Comédie","Crime","Documentaire","Drame","Horreur","Music","Romance","Sci-Fi","Thriller","Western"];
const categorieTvTestValue:string[] = ["Hit TV","Drama TV","True Crime","Reality","News","Sports","Game Shows","History & Science","Comedy","Daytime TV","Movies","Sci-Fi & Action","Chills & Thrills","Classic TV","Food & Home","Black Entertainment","Kids & Family","Lifestyle","Music","Nature & Travel","Anime & Gaming","International"];
const exploreFilm:string[] = ["Film a venir","Film populaire","Films actuellement en salle","Film mieux noté"];
const exploreTv:string[] = ["Tv mieux noté","Tv populaire","Tv diffusé aujourd'hui"];
export default function Header() {
    const [displayFIlm,setDisplayFilm] = useState('hidden');
    const [displayTv,setDisplayTv] = useState('hidden');
    const [isHeaderIconFilm,setIsHeaderIconFilm] = useState(false);
    const [isHeaderIconTv,setIsHeaderIconTv] = useState(false);
    return (
        <header className="flex items-center justify-between sticky bg-black px-5 py-5 w-full top-[0px] z-20">
            <span><Link to='/'>LOGO</Link></span>
            <div className="navi flex justify-between gap-7">
                <nav className="flex items-center gap-5">
                    <Link to='/'>Accueil</Link>
                    <div className={isHeaderIconFilm?'idown relative':'relative'} onMouseOver={(e)=>{setDisplayFilm('block');setIsHeaderIconFilm(true)}} onMouseLeave={(e)=>{setDisplayFilm('hidden');setIsHeaderIconFilm(false)}}>Filmes<i className="fa fa-angle-up ml-2 text-lg" aria-hidden="true"></i><Subheader type='Filme' categorie={categorieFilmTestValue} explore={exploreFilm} display={displayFIlm}/></div>
                    <div className={isHeaderIconTv?'idown relative':'relative'} onMouseOver={(e)=>{setDisplayTv('block');setIsHeaderIconTv(true)}} onMouseLeave={(e)=>{setDisplayTv('hidden');setIsHeaderIconTv(false)}}>TVs<i className="fa fa-angle-up ml-2 text-lg" aria-hidden="true"></i><Subheader type='TV' categorie={categorieTvTestValue} explore={exploreTv} display={displayTv}/></div>
                </nav>
                <Search/>
            </div>
        </header>
    )
}