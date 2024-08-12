import { useState } from "react";
import MovieSlider from "./slick";

const movieStyle = "text-yellow w-[60px] h-full movie";
export default function MovieComponent({listMovie}:{listMovie:any[]}){
    const [movieActuelItem, setMovieActuelItem] = useState(0);
    const movieStting = {
        dots: false,
        infinite: true,
        arrows: false,
        centerMode: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        beforeChange: (current:any, next:number) => setMovieActuelItem(next),
        responsive: [
            {
              breakpoint: 2500,
              settings: {
                slidesToShow: 8,
              }
            },
            {
                breakpoint: 2000,
                settings: {
                  slidesToShow: 7,
                }
              },
            {
                breakpoint: 1800,
                settings: {
                  slidesToShow: 6,
                }
              },
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: 5,
              }
            },
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 4,
              }
            },
            {
                breakpoint: 1100,
                settings: {
                  slidesToShow: 3,
                }
            },
            {
                breakpoint: 900,
                settings: {
                  slidesToShow: 2,
                }
            },
            {
                breakpoint: 700,
                settings: {
                  slidesToShow: 4,
                }
            },
            {
                breakpoint: 600,
                settings: {
                  slidesToShow: 3,
                }
            },
            {
                breakpoint: 400,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
            },
            {
                breakpoint: 400,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
            }
        ]
    }
    return (
        <MovieSlider settings={movieStting} data={listMovie} width={'w-[100%]'} providerStyle={movieStyle} left=' left-0 ' right=' right-0 ' currentItem={movieActuelItem}/>
    )
}