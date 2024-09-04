import { useState } from "react";
import MovieSlider from "./slick";

export default function ProviderComponent({listProvider,providerStyle,left,right}:{listProvider:any[],providerStyle:string,left:string,right:string}){
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
        <MovieSlider settings={providerSettings} data={listProvider} width={'w-[100%]'} providerStyle={providerStyle} left={left} right={right} currentItem={providerActuelItem}/>
    )
}