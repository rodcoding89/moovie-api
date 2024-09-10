import { Link } from "react-router-dom";

export const filmStting = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true
}
export default function CardFilm({cardData}:{cardData:any}){
    return (
        <div className="relative flex items-center justify-center">
            <img src={process.env.PUBLIC_URL+'/'+cardData.linkImg} alt={cardData.name} className="absolute left-0 top-0 brightness-[.3] object-cover" />
            <div className="flex items-center justify-center w-[70%] gap-x-8 max-730:flex-col max-730:w-full">
                <img src={process.env.PUBLIC_URL+'/'+cardData.linkImg1} alt={cardData.name} className="object-cover w-[200px] z-10 max-730:my-5" />
                <div className="z-10 max-730:w-full max-730:flex max-730:items-center max-730:justify-center max-730:mx-5 max-730:flex-col">
                    <h3 className="text-[1.5em] text-white text-left bold mb-3">{cardData.name}</h3>
                    <span className="text-left mb-3 block">{cardData.rate}</span>
                    <p className="text-left regular text-second-white text-[1em] mb-5 max-730:mx-5">{cardData.description}</p>
                    <Link to="" className="px-4 py-2 regular text-center text-black w-[165px] bg-yellow flex items-center justify-center gap-x-2"><i className="fa fa-info-circle text-black text-[1em]" aria-hidden="true"></i>Plus d'info</Link>
                </div>
            </div>
        </div>
    )
}