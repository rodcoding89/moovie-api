import { image_base_url } from "src/constante/data";
export default function CardProvider({cardData}:{cardData:any}){
    return (
        <div className="flex gap-1 items-center justify-center w-full">
            <img className="w-[calc(145px/3)] aspect-square" src={image_base_url+'/'+cardData.logo_path} alt={cardData.provider_name}/>
            <span className="text-second-white text-center block w-[calc(100%/3*2-4px)] text-ellipsis overflow-hidden whitespace-nowrap">{cardData.provider_name}</span>
        </div>
    )
}