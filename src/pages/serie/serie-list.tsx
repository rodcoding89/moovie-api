import { Link, useParams } from "react-router-dom"
import Teaser from "../utils/teaser";

const testListSerie:any[] = [{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"}]
export default function SerieList(){
    const {name,id} = useParams();
    let cat = name?.replaceAll('-',' ');
    cat = id === 'airing_today'? 'Series diffuséés aujourd\'hui' : id === 'top_rated' ? 'Series mieux notés' : id === 'popular' ? 'Series populaires' : 'Toutes nos Séries '+cat+' en Streaming ';
    return (
        <div className="content">
            <section className="relative bg-black">
                <Teaser teaserImg={process.env.PUBLIC_URL+'/assets/images/genre-film.avif'} description="Bienvenue au bord de votre siège, car il est temps de plonger dans l'action. Des westerns classiques et films de guerre aux aventures de héros d'action modernes." cat={cat}/>
            </section>
            <section>
                <div className="flex justify-center items-center gap-7 flex-wrap mx-[5vw] my-10">
                    {
                        testListSerie.map((t:any,index:number)=>{
                            return (
                                <Link className="w-[206px]" key={index} to={'../serie/1'}>
                                    <div className="">
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