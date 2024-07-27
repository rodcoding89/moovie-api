export default function FilmDetail(){
    return (
        <div className="relative">
            <div className="flex justify-start items-start gap-x-9">
                <img className="brightness-[.3] absolute top-0 left-0 object-cover" src={process.env.PUBLIC_URL+'/assets/images/photo.avif'} alt="poster"/>
                <div className="w-[275px] pl-[5vw] py-[5vw] z-10">
                    <img src={process.env.PUBLIC_URL+'/assets/images/photo.avif'} alt="poster" />
                </div>
                <div className="w-[50%] pr-[5vw] py-[5vw] z-10">
                    <h3 className="text-primaire-white">Noé</h3>
                    <span className="text-second-white text-[.9em]">Directed by Darren Aronofsky</span>
                    <p>2014 2h 18min TP</p>
                    <span>Drame, Action et Adventure</span>
                    <span>5.8</span>
                    <p>Noé, un père de famille, reçoit un message de Dieu au cours d’un rêve : la Terre s’apprête à subir un déluge apocalyptique, car l’homme a corrompu le monde à force de violence et d’avidité. Il part alors avec sa femme et ses enfants sur le mont Ararat et entreprend la</p>
                    <details><summary>Voir plus</summary>Noé, un père de famille, reçoit un message de Dieu au cours d’un rêve : la Terre s’apprête à subir un déluge apocalyptique, car l’homme a corrompu le monde à force de violence et d’avidité. Il part alors avec sa femme et ses enfants sur le mont Ararat et entreprend la construction d’une arche monumentale pour mettre à l’abri toutes les espèces existantes de l’humanité, sauver les innocents et préserver la vie sur Terre. Il accomplit ainsi son destin hors du commun. Mais il se heurte à un seigneur de la guerre qui cherche à régner sur ce monde dévasté, et qui lance une armée entière contre lui</details>
                </div>
            </div>
        </div>
    )
}