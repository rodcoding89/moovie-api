import { Link, useParams } from "react-router-dom"
import Teaser from "../utils/teaser";

const testListFilm:any[] = [{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"}]
export default function FilmList(){
    const {name,id} = useParams();
    let cat = name?.replaceAll('-',' ');
    cat = id === 'upcoming'? 'Les films à venir' : id === 'top_rated' ? 'Les films mieux notés' : id === 'now_playing' ? 'Les film actuellement en salle' : id === 'popular' ? 'Les films populaires' : 'Catégorie '+cat;
    return (
        <div className="content">
            <section className="relative bg-black">
                <Teaser teaserImg={process.env.PUBLIC_URL+'/assets/images/genre-film.avif'} description="Bienvenue au bord de votre siège, car il est temps de plonger dans l'action. Des westerns classiques et films de guerre aux aventures de héros d'action modernes." cat={cat}/>
            </section>
            <section>
                <div className="flex justify-center items-center gap-7 flex-wrap mx-[5vw] my-10">
                    {
                        testListFilm.map((t:any,index:number)=>{
                            return (
                                <Link className="w-[206px]" key={index} to={'../film/1'}>
                                    <div className="w-full">
                                        <div className="overflow-hidden">
                                            <img className="anime" src={process.env.PUBLIC_URL+'/'+t.url} alt={t.name} />
                                        </div>
                                        <h4 className="text-black bold mt-3 mb-1">{t.name}</h4>
                                        <span className="text-second-white regular">{t.year}</span>
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