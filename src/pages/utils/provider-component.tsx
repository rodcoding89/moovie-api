import { useState } from "react";
import MovieSlider from "./slick";
const providerStyle = 'text-black w-10 h-10 rounded-full hover:bg-slate-100';
export default function ProviderComponent({listProvider}:{listProvider:any[]}){
    const [providerActuelItem, setProviderActuelItem] = useState(0);
    const providerSettings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 9,
        slidesToScroll: 1,
        beforeChange: (current:any, next:number) => setProviderActuelItem(next),
        responsive: [
            {
              breakpoint: 2500,
              settings: {
                slidesToShow: 11,
              }
            },
            {
                breakpoint: 1500,
                settings: {
                  slidesToShow: 7,
                }
              },
            {
                breakpoint: 1100,
                settings: {
                  slidesToShow: 6,
                }
              },
            {
              breakpoint: 1100,
              settings: {
                slidesToShow: 5,
              }
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 4,
              }
            },
            {
                breakpoint: 500,
                settings: {
                  slidesToShow: 3,
                }
            },
            {
                breakpoint: 300,
                settings: {
                  slidesToShow: 2,
                }
            }
        ]
    };
    return (
        <MovieSlider settings={providerSettings} data={listProvider} width={'w-[100%]'} providerStyle={providerStyle} left=' left-[-65px] ' right=' right-[-65px] ' currentItem={providerActuelItem}/>
    )
}