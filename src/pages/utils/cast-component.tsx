import { useState } from "react";
import MovieSlider from "./slick";
const castStyle = 'text-white w-10 h-10 rounded-full hover:bg-yellow hover:text-black';
export default function CastComponent({castList}:{castList:any[]}){
    const [castActuelItem,setCastActuelItem] = useState(0);
    const castSettings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 11,
        slidesToScroll: 1,
        beforeChange: (current:any, next:number) => setCastActuelItem(next),
        responsive: [
            {
              breakpoint: 2500,
              settings: {
                slidesToShow: 10,
              }
            },
            {
                breakpoint: 1820,
                settings: {
                  slidesToShow: 9,
                }
              },
            {
                breakpoint: 1638,
                settings: {
                  slidesToShow: 8,
                }
              },
            {
              breakpoint: 1456,
              settings: {
                slidesToShow: 7,
              }
            },
            {
              breakpoint: 1274,
              settings: {
                slidesToShow: 6,
              }
            },
            {
                breakpoint: 1092,
                settings: {
                  slidesToShow: 5,
                }
            },
            {
                breakpoint: 910,
                settings: {
                  slidesToShow: 4,
                }
            },
            {
                breakpoint: 728,
                settings: {
                  slidesToShow: 3,
                }
            },
            {
                breakpoint: 546,
                settings: {
                  slidesToShow: 2,
                }
            },
            {
                breakpoint: 364,
                settings: {
                  slidesToShow: 1,
                }
            }
        ]
    };
    return (
        <MovieSlider settings={castSettings} data={castList} width={'w-[100%]'} providerStyle={castStyle} left=' left-[-25px] ' right=' right-[-25px] ' currentItem={castActuelItem}/>
    )
}