import { Link, useParams } from "react-router-dom"
import Teaser from "../utils/teaser";
import { options,image_base_url } from "src/constante/data";
import { UseGetTmDbData } from "src/hooks/pages-hook";

export default function SerieList(){
    const {name,id} = useParams();
    let cat = name?.replaceAll('-',' ');
    const headers = options;
    cat = id === 'airing_today'? 'Series diffuséés aujourd\'hui' : id === 'top_rated' ? 'Series mieux notés' : id === 'popular' ? 'Series populaires' : 'Toutes nos Séries '+cat+' en Streaming ';
    const url = id === 'airing_today' || id === 'top_rated' || id === 'popular' ? `https://api.themoviedb.org/3/tv/${id}`:` https://api.themoviedb.org/3/discover/tv?with_genres=${id}&language=fr`;
    const {data,error,loading} = UseGetTmDbData(url,headers);
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
                                <Link className="w-[206px] self-stretch" key={t.name+'_'+index} to={'../serie/'+t.id}>
                                    <div className="">
                                        <div className="overflow-hidden">
                                            <img className="anime w-full h-[309px]" src={image_base_url+t.poster_path} alt={t.name} />
                                        </div>
                                        <h4 className="text-black bold mt-3 mb-1">{t.name}</h4>
                                        <span className="text-second-white regular">{t.first_air_date.split('-')[0]}</span>
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