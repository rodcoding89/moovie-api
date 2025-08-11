import { Link } from "react-router-dom";
import { image_base_url } from "src/constante/data";

export default function CardFilm({cardData,link}:{cardData:any,link:string}){
    const description = cardData.overview.split(' ',52).join(' ');
    return (
        <div className="relative flex items-center justify-center h-filt">
            <img src={process.env.PUBLIC_URL+'/assets/images/the-acolyte.jpeg'} alt={cardData.name} className="absolute top-0 left-0 brightness-[.3] object-cover first-link h-full" />
            <div className="flex items-center justify-center w-[70%] py-5 gap-x-8 max-730:flex-col max-730:w-full">
                <img src={image_base_url+cardData.poster_path} alt={cardData.name} className="object-cover w-[200px] z-10 max-730:my-5 second-link" />
                <div className="z-10 max-730:w-full max-730:flex max-730:items-center max-730:justify-center max-730:mx-5 max-730:flex-col">
                    <h3 className="text-[1.5em] text-white text-left bold mb-3 max-700:text-center">{cardData.name}</h3>
                    <span className="text-left mb-3 block">{cardData.vote_average}</span>
                    <p className="text-left regular text-second-white text-[1em] mb-5 max-730:mx-5 max-730:text-center">{description} ...</p>
                    <Link to={link} className="px-4 py-2 regular text-center text-black w-[165px] bg-yellow flex items-center justify-center gap-x-2"><i className="fa fa-info-circle text-black text-[1em]" aria-hidden="true"></i>Plus d'info</Link>
                </div>
            </div>
        </div>
    )
}