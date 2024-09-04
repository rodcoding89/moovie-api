import { Link, useParams } from "react-router-dom";
import CastComponent from "../utils/cast-component";

import Cast from "../utils/cast";
import { cast } from "../film/film-detail";
import PostSerie from "../utils/post-serie";

const castList = cast.map((c,index)=>{
    return <Cast key={index} castData={c}/>
})
const lastAddedSerie:any[] = [{title:'Noveau monde',saison:2,episode:3,link:'twister.webp'},{title:'Noveau monde',saison:2,episode:3,link:'twister.webp'},{title:'Noveau monde',saison:2,episode:3,link:'twister.webp'},{title:'Noveau monde',saison:2,episode:3,link:'twister.webp'},{title:'Noveau monde',saison:2,episode:3,link:'twister.webp'},{title:'Noveau monde',saison:2,episode:3,link:'twister.webp'},{title:'Noveau monde',saison:2,episode:3,link:'twister.webp'},{title:'Noveau monde',saison:2,episode:3,link:'twister.webp'},{title:'Noveau monde',saison:2,episode:3,link:'twister.webp'},{title:'Noveau monde',saison:2,episode:3,link:'twister.webp'},{title:'Noveau monde',saison:2,episode:3,link:'twister.webp'},{title:'Noveau monde',saison:2,episode:3,link:'twister.webp'},{title:'Noveau monde',saison:2,episode:3,link:'twister.webp'},{title:'Noveau monde',saison:2,episode:3,link:'twister.webp'},{title:'Noveau monde',saison:2,episode:3,link:'twister.webp'},{title:'Noveau monde',saison:2,episode:3,link:'twister.webp'}];
export const serieInfo = {
    year : 2015,
    genre : "Drame, Thriller, Séries VF",
    country : "U.S.A.",
    time : "42 min",
    director : "Joshua Safran",
    title : "Quantico",
    description : "De jeunes recrues du FBI se battent de toutes leurs forces sur le camp d'entraînement de Quantico en Virginie, entre tests d'endurance physique, cours de tir, et maîtrise de l'art de l'enquête et de l'interrogatoire. Ils ont 50% de chances d'échouer et la compétition fait rage. 9 mois plus tard, l'un d'entre eux est suspecté d'avoir commis la plus grosse attaque terroriste sur le sol américain depuis le 11 Septembre 2001...",
    like : '80%',
    unlike : '20%',
    classUnlike : 'w-[20%]',
    classLike : 'w-[80%]'
}
export default function Season(){
    const epNum = 30;
    const epList = [];
    
    const numSea = 2;
    const {id,season_id} = useParams();
    console.log('season_id',season_id)
    const actuelSeason = season_id ? parseInt(season_id):0;
    const seasonList = [];
    for (let i = 0; i < epNum; i++) {
        epList.push(<div className={'bg-[#2b2c2d] p-2 text-center box-border rounded-xl hover:border-b-[1px] hover:border-b-yellow'}><Link className="text-yellow" to={'episode/'+(i+1)}>Episode {i+1}</Link></div>)
    }
    for (let i = 0; i < numSea; i++) {
        let htmlEl = (i+1) === actuelSeason ? <div className='w-[185px]'>
        <div className={(i+1) === actuelSeason ? 'active-season relative': 'relative'}>
            <img className="w-full" src={process.env.PUBLIC_URL+'/assets/images/twister.webp'} alt="twister" />
            {
                (i+1) === actuelSeason && <span className="absolute top-[50%] block text-center w-full text-[.8em] left-[50%] translate-x-[-50%] translate-y-[-50%]">Tu vois cette saison</span>
            }
        </div>
        <span className="text-white medium text-center mt-3 block">Saison {i+1}</span>
        </div> : <Link to={'../serie/'+id+'/season/'+(i+1)} className='w-[185px]'>
            <div className={(i+1) === actuelSeason ? 'active-season relative': 'relative'}>
                <img className="w-full" src={process.env.PUBLIC_URL+'/assets/images/twister.webp'} alt="twister" />
                {
                    (i+1) === actuelSeason && <span className="absolute top-[50%] block text-center w-full text-[.8em] left-[50%] translate-x-[-50%] translate-y-[-50%]">Tu vois cette saison</span>
                }
            </div>
            <span className="text-white medium text-center mt-3 block">Saison {i+1}</span>
        </Link>
         seasonList.push(htmlEl)
    }
    return (
        <div className="w-[100%] mx-auto flex">
            <div className="w-[20%] bg-black">
                <h4 className="text-yellow text-center mt-5 mb-10">DERNIERS ÉPISODES AJOUTÉS</h4>
                <div className="flex gap-y-5 flex-col mx-5">
                    {
                        lastAddedSerie.map((l,i)=>{
                            return(
                                <div key={i} className="flex justify-center items-start gap-x-5">
                                    <img className="w-[80px] h-[80px]" src={process.env.PUBLIC_URL+'/assets/images/'+l.link} alt={l.title} />
                                    <div>
                                        <h6 className="text-yellow text-[.9em] bold">{l.title}</h6>
                                        <span className="text-primaire-white text-[.65em] medium">Saison <span className="text-red-700 mr-2 regular">{l.saison}</span></span>
                                        <span className="text-primaire-white text-[.65em] medium">Episode <span className="text-red-700 regular">{l.episode}</span></span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="flex-1 bg-[#1a1a1a]">
                <div>
                    <PostSerie backImg={process.env.PUBLIC_URL+'/assets/images/photo.avif'} seriePostUrl={process.env.PUBLIC_URL+'/assets/images/twister.webp'} serieInfo={serieInfo}/>
                </div>
                <div className="cast my-10 z-10 relative mx-10">
                    <h3 className=" text-yellow text-[1.6em] bold mb-10">Casting de Quantico</h3>
                    <div className="w-[70vw]"><CastComponent castList={castList}/></div>
                </div>
                <div className="m-10">
                    <h3 className="text-yellow text-[1.6em] mb-10 bold">Voir tous les épisodes disponibles de Quantico saison {season_id}</h3>
                    <div className="flex items-center justify-center flex-wrap gap-3">{epList}</div>
                </div>
                <div className="mx-10 mb-20">
                    <h3 className="text-yellow text-[1.6em] mb-5 bold">Autres Saisons en Streaming Gratuit</h3>
                    <hr className="border-b-white mb-3"/>
                    <div className="flex gap-x-10 items-center justify-center mt-5">
                        {
                            seasonList
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}