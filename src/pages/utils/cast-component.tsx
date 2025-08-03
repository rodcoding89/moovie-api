
import Carousel from "src/util/carousel/carousel";

export default function CastComponent({castList=[],responsive}:{castList:any[],responsive:any[]}){
    return (
        <Carousel items={castList} itemsLength={castList.length} childWidth={165} iconStyle="text-yellow" navButtonStyle="w-10 h-10 rounded-full hover:bg-[#000]" spaceBetweenItem={30} carouselType="list" posLeft="max-885:left-[-40px]" posRight="max-885:right-[-40px]"/>
    )
}