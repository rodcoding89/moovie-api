import { Link, useParams } from "react-router-dom"

const testListFilm:any[] = [{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"},{name:"Empire records",year:"2005",url:"assets/images/twister.webp"}]
export default function FilmList(){
    const {name,id} = useParams();
    let cat = name?.replaceAll('-',' ');
    cat = id === 'upcoming'? 'Les films à venir' : id === 'top_rated' ? 'Les films mieux notés' : id === 'now_playing' ? 'Les film actuellement en salle' : id === 'popular' ? 'Les films populaires' : 'Catégorie '+cat;
    return (
        <div className="content">
            <section className="relative bg-black">
                <div className="min-h-[300px] flex justify-start items-center">
                    <div style={{maskImage:`url(${process.env.PUBLIC_URL}/assets/images/left-cover.svg)`,WebkitMaskImage:`url(${process.env.PUBLIC_URL}/assets/images/left-cover.svg)`,maskPosition:'left bottom',WebkitMaskPosition: 'left bottom',maskSize:'100%',width:'64%',left:'unset',right:0,position:'absolute',height:'100%'}} className="">
                        <img className="absolute w-full h-full left-0 top-0" src={process.env.PUBLIC_URL+'/assets/images/genre-film.avif'} alt="genre filme" />
                    </div>
                    <div className="py-[10%] w-[45%] ml-[5vw]">
                        <h1 className="text-yellow bold text-[3.1em] mb-7 first-letter:uppercase">{cat}</h1>
                        <p className="text-primaire-white regular text-[1.1em]">Bienvenue au bord de votre siège, car il est temps de plonger dans l'action. Des westerns classiques et films de guerre aux aventures de héros d'action modernes.</p>
                    </div>
                </div>
            </section>
            <section>
                <div className="flex justify-between items-center gap-7 flex-wrap mx-[5vw] my-10">
                    {
                        testListFilm.map((t:any,index:number)=>{
                            return (
                                <Link key={index} to={'../film/1'} className="width">
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