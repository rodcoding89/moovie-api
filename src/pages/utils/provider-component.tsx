
import Carousel from "src/util/carousel/carousel";

export default function ProviderComponent({listProvider,buttonStyle,iconStyle,movieType}:{listProvider:any[],buttonStyle:string,iconStyle:string,movieType:string}){
    if (listProvider.length === 0) {
      return (
        <p className="">Aucun provider pour {movieType === 'film' ? 'ce film':'cette serie'}</p>
      )
    }
    return (
      <Carousel items={listProvider} itemsLength={listProvider.length} childWidth={145} iconStyle={iconStyle} navButtonStyle={buttonStyle} spaceBetweenItem={50} carouselType="list" posLeft="left-[0px] max-885:left-[-40px]" posRight="right-[0px] max-885:right-[-40px]"/>
    )
}