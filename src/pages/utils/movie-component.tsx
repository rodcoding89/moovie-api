
import Carousel from "src/util/carousel/carousel";

export default function MovieComponent({listMovie=[],carouselType,gap}:{listMovie:any[],carouselType:"item"|"list",gap:number}){
    
    return (
      <Carousel items={listMovie} itemsLength={listMovie.length} childWidth={165} iconStyle="text-yellow" navButtonStyle="bg-[rgba(0,0,0,.4)] w-[60px] h-full" spaceBetweenItem={gap} posTop="top-0" posLeft="left-0" posRight="right-0" carouselType={carouselType}/>
    )
}