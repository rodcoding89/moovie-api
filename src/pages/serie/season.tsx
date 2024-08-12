import { Link, useParams } from "react-router-dom";
import CastComponent from "../utils/cast-component";

import Cast from "../utils/cast";
import { cast } from "../film/film-detail";

const castList = cast.map((c,index)=>{
    return <Cast key={index} castData={c}/>
})
export default function Season(){
    const epNum = 30;
    const epList = [];
    const like = '80%';
    const unlike = '20%';
    const {season_id} = useParams();
    console.log('season_id',season_id)
    const classUnlike = 'w-[20%]';
    const classLike = 'w-[80%]';
    for (let i = 0; i < epNum; i++) {
        epList.push(<div className={'bg-[#2b2c2d] p-2 text-center box-border rounded-xl hover:border-b-[1px] hover:border-b-yellow'}><Link className="text-yellow" to={'episode/'+(i+1)}>Episode {i+1}</Link></div>)
    }
    return (
        <div className="w-[100%] mx-auto flex">
            <div className="w-[20%] bg-black">
                <h4>DERNIERS ÉPISODES AJOUTÉS</h4>
            </div>
            <div className="flex-1 bg-[#1a1a1a]">
                <div className="flex gap-5 items-center justify-start p-4">
                    <div className="w-[185px]">
                        <img className="w-[100%]" src={process.env.PUBLIC_URL+'/assets/images/twister.webp'} alt="twister" />
                    </div>
                    <div className="w-[50%]">
                        <div className="text-primaire-white p-3 bg-black mb-1 flex justify-between items-center">Année: <span className="text-white">2015</span> </div>
                        <div className="text-primaire-white p-3 bg-black mb-1 flex justify-between items-center">Genre: <span className="text-white">Drame, Thriller, Séries VF</span></div>
                        <div className="text-primaire-white p-3 bg-black mb-1 flex justify-between items-center">Pays: <span className="text-white">U.S.A.</span></div>
                        <div className="text-primaire-white p-3 bg-black mb-1 flex justify-between items-center">Temps: <span className="text-white">42 min</span></div>
                        <div className="text-primaire-white p-3 bg-black flex justify-between items-center">Réalisateur: <span className="text-white">Joshua Safran</span></div>
                    </div>
                    <div className="spectateur z-10 flex-1">
                        <span>Like</span>
                        <div className="bloc flex items-center justify-center my-1"><div className={'left h-1 bg-green-500 '+classLike}></div><div className={'right h-1 bg-red-500 '+classUnlike}></div></div>
                        <div className="number flex justify-between items-center"><span className="text-[.75em]">{like}</span><span className="text-[.75em]">{unlike}</span></div>
                    </div>
                </div>
                <div className="cast mx-auto my-5 w-[100%] z-10 relative p-5">
                    <h3 className="mb-5 text-white text-[1.6em] bold">Casting de Quantico</h3>
                    <div className="w-[75vw]"><CastComponent castList={castList}/></div>
                </div>
                <div className="p-5">
                    <h3 className="text-white text-[1.6em] mb-5 bold">Voir tous les épisodes disponibles de Quantico saison {season_id}</h3>
                    <div className="flex items-center justify-center flex-wrap gap-3">{epList}</div>
                </div>
            </div>
        </div>
    )
}