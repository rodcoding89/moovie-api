import { useState } from "react";
import MovieSlider from "./slick";
const castStyle = ' text-white w-10 h-10 rounded-full hover:bg-yellow hover:text-black ';
export default function CastComponent({castList,responsive}:{castList:any[],responsive:any[]}){
    const [castActuelItem,setCastActuelItem] = useState(0);
    const castSettings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 11,
        slidesToScroll: 1,
        beforeChange: (current:any, next:number) => setCastActuelItem(next),
        responsive: responsive
    };
    return (
        <MovieSlider settings={castSettings} data={castList} width={'w-[100%]'} providerStyle={castStyle} left=' left-[-25px] max-730:left-[-5px] ' right=' right-[-25px] max-730:right-[-5px] ' currentItem={castActuelItem}/>
    )
}