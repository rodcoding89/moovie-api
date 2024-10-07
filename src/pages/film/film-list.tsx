import { Link, useParams } from "react-router-dom"
import Teaser from "../utils/teaser";

import { options,image_base_url } from "src/constante/data";
import { UseGetTmDbData } from "src/hooks/pages-hook";

export default function FilmList(){
    const {name,id} = useParams();
    let cat = name?.replaceAll('-',' ');
    const headers = options;
    cat = id === 'upcoming'? 'Les films à venir' : id === 'top_rated' ? 'Les films mieux notés' : id === 'now_playing' ? 'Les film actuellement en salle' : id === 'popular' ? 'Les films populaires' : 'Catégorie '+cat;
    const url = id === 'upcoming' || id === 'top_rated' || id === 'now_playing' || id === 'popular' ? `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`:`https://api.themoviedb.org/3/discover/movie?with_genres=${id}&language=fr`;
    const { data, loading, error } = UseGetTmDbData(url,headers);
    console.log('filmdata',data)
    return (
        <div className="content">
            <section className="relative bg-black">
                <Teaser teaserImg={process.env.PUBLIC_URL+'/assets/images/genre-film.avif'} description="Bienvenue au bord de votre siège, car il est temps de plonger dans l'action. Des westerns classiques et films de guerre aux aventures de héros d'action modernes." cat={cat}/>
            </section>
            <section>
                <div className="flex justify-center items-center gap-7 flex-wrap mx-[5vw] my-10">
                    {
                        data?.results.map((t:any,index:number)=>{
                            return (
                                <Link className="w-[206px] self-stretch" key={t.original_title+'_'+index} to={'../film/'+t.id}>
                                    <div className="w-full">
                                        <div className="overflow-hidden">
                                            <img className="anime w-full h-[309px]" src={image_base_url+t.poster_path} alt={t.original_title} />
                                        </div>
                                        <h4 className="text-black bold mt-3 mb-1">{t.original_title}</h4>
                                        <span className="text-second-white regular">{t.release_date.split('-')[0]}</span>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}