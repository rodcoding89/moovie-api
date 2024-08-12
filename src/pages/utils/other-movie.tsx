import { useState } from "react";
import MovieSlider from "./slick";
const movieStyle = "text-yellow w-[60px] h-full movie";
export default function OtherMovie({listMovie}:{listMovie:any[]}){
    const [otherMovieActuelItem, setOtherMovieActuelItem] = useState(0);
    const otherMovieStting = {
        dots: false,
        infinite: true,
        arrows: false,
        centerMode: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        beforeChange: (current:any, next:number) => setOtherMovieActuelItem(next),
        responsive: [
          {
            breakpoint: 2000,
            settings: {
              slidesToShow: 7,
            }
          },
          {
              breakpoint: 1520,
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
              breakpoint: 933,
              settings: {
                slidesToShow: 4,
              }
          },
          {
              breakpoint: 737,
              settings: {
                slidesToShow: 3,
              }
          },
          {
            breakpoint: 537,
            settings: {
              slidesToShow: 2,
            }
        },
        {
            breakpoint: 360,
            settings: {
              slidesToShow: 1,
            }
        }
      ]
    }
    return (
        <MovieSlider settings={otherMovieStting} data={listMovie} width={'w-[100%]'} providerStyle={movieStyle} left=' left-0 ' right=' right-0 ' currentItem={otherMovieActuelItem}/>
    )
}