import Poster from "../utils/poster"
import Cast from "../utils/cast";
import CardProvider from "../utils/card-provider";
import MovieCard from "../utils/movie-card";
import { Link } from "react-router-dom";
import OtherMovie from "../utils/other-movie";
import { cast } from "../film/film-detail";
import CastComponent from "../utils/cast-component";
import { movieSlider, provider } from "../home";
import ProviderComponent from "../utils/provider-component";
import MovieComponent from "../utils/movie-component";

const providerStyle = 'text-white w-10 h-10 rounded-full hover:bg-yellow hover:text-black';
const info = {
    name : "Le monde qui nous sépare",
    year : "2024 42min",
    director : "Réalisé par Daphne Ferraro",
    genre : "Drame, Adventure",
    rate : 5.8,
    country : "Allemagne",
    shortDes : "Lorsque Ruby est involontairement témoin d'un secret explosif à l'école privée Maxton Hall, l'arrogant héritier millionnaire James Beaufort doit faire face à la vivacité d'esprit de l'étudiante pour le meilleur et pour le pire",
    description : "Lorsque Ruby est involontairement témoin d'un secret explosif à l'école privée Maxton Hall, l'arrogant héritier millionnaire James Beaufort doit faire face à la vivacité d'esprit de l'étudiante pour le meilleur et pour le pire : il est déterminé à faire taire Ruby. Leur échange passionné de mots déclenche inopinément une étincelle.",
    classUnlike : "w-[20%]",
    classLike : "w-[80%]",
    unlike : "20%",
    like : "80%"
}

const castList = cast.map((c,index)=>{
    return <Cast key={index} castData={c}/>
})
const listProvider:any[] = provider.map((p:any,index:number)=>{
  return <CardProvider key={index} cardData={p} />
})
const listMovie:any[] = movieSlider.map((m,index)=>{
  return <MovieCard key={index} cardData={m}/>
})

export default function SerieDetail(){
  const saison = 2;
  const listSaison = [];
  for (let i = 0; i < saison; i++) {
    listSaison.push(<div className="cursor-pointer"><Link className="w-[165px]" to={'season/'+(i+1)}><img className="mb-2" src={process.env.PUBLIC_URL+'/assets/images/twister.webp'} alt="saison"/>Saison {i+1}</Link></div>)
  }
    return (
        <div className="bg-black">
            <section>
                <div>
                    <Poster mask={process.env.PUBLIC_URL+'/assets/images/cover.svg'} poster={process.env.PUBLIC_URL+'/assets/images/photo.avif'} info={info}/>
                    <div className="flex justify-center items-center gap-x-10 relative z-10 mt-3 mb-16 flex-col">
                        <h4 className="bold mb-5 text-yellow">Toutes les saisons de "Le monde qui nous sépare" en streaming</h4>
                        <div className="flex justify-center items-center gap-x-10 relative z-10">{listSaison}</div>
                    </div>
                </div>
            </section>
            <section>
                <div className="cast mx-auto my-5 w-[90vw] z-10 relative">
                    <h3 className="mb-5 text-white text-[1.6em] bold">Casting Le monde qui nous sépare</h3>
                    <CastComponent castList={castList}/>
                </div>
                <div className="trailler mx-auto my-5 w-[90vw] z-10 relative">
                    <h3 className="mb-5 text-white text-[1.6em] bold">Regarder un extrait de la serie</h3>
                    <div className="poster cursor-pointer">
                        <img className="w-[200px]" src={process.env.PUBLIC_URL+'/assets/images/the-acolyte.jpeg'} alt="poster" />
                        <h5 className=" text-yellow text-[1.2em] bold my-2">Noé</h5>
                        <p className="text-second-white">Trailler</p>
                    </div>
                </div>
                <div className="my-5 mx-auto w-[90vw] z-10 relative mb-5">
                    <h3 className="text-white text-[1.75em] medium mb-5">Service de streaming pour cette serie</h3>
                    <div className="w-[90vw] mx-auto"><ProviderComponent listProvider={listProvider} providerStyle={providerStyle} left=" left-0 " right=" right-0 "/></div>
                </div>
                <div className="relative mx-auto z-10 w-[100%] mt-[50px] mb-10 flex gap-x-5 items-start">
                    <div className="w-[30%]">
                        <h3 className="text-yellow text-[1.75em] ml-[5vw] medium mb-5">Series qui pourraient aussi vous intéresser</h3>
                        <p className="text-white medium ml-[5vw]">Parcourez les series qui pouraient correspondre à vos critères.</p>
                    </div>
                    <div className="w-[70%]"><MovieComponent listMovie={listMovie}/></div>
                </div>
                <div className="relative my-5 z-10">
                    <h3 className="text-white text-[1.75em] ml-[5vw] mb-8">Autre serie avec Daphne Ferraro</h3>
                    <div className="ml-[5vw]">
                        <OtherMovie listMovie={listMovie}/>
                    </div>
                </div>  
            </section>
        </div>
    )
}