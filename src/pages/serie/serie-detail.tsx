import Poster from "../utils/poster"

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
export default function SerieDetail(){
    return (
        <div>
            <section>
                <div>
                    <Poster mask={process.env.PUBLIC_URL+'/assets/images/cover.svg'} poster={process.env.PUBLIC_URL+'/assets/images/photo.avif'} info={info}/>
                </div>
            </section>
        </div>
    )
}