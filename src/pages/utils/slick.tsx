import { useRef } from "react";
import Slider from "react-slick";

export default function MovieSlider(this: any, {settings,data,width,providerStyle,left,right,currentItem}:{settings:any,data:any[],width:string,providerStyle:string,left:string,right:string,currentItem:number}) {
  let sliderRef:any = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  console.log('currentItem',currentItem,data.length);
  return (
    <div className={width+' carousel relative'}>
      {
        currentItem > 1 && (
          <span onClick={previous} className={providerStyle+left+' absolute z-10 top-[50%] translate-y-[-50%] flex items-center justify-center text-[2.2em] cursor-pointer'}>
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </span>
        )
      }
      <Slider {...settings} ref={slider => {
          sliderRef = slider;
        }}>
      {
        data.map((d,index)=>{
          return d;
        })
      }
      </Slider>
      {
        currentItem < data.length && (
          <span onClick={next} className={providerStyle+right+' absolute z-10 top-[50%] translate-y-[-50%] flex items-center justify-center text-[2.2em] cursor-pointer'}>
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </span>
        )
      }
    </div>
    );
}