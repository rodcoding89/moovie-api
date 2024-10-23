import { image_base_url } from "src/constante/data";
export default function CardProvider({cardData}:{cardData:any}){
    return (
        <div className="flex flex-col items-center justify-center">
            <img className="w-[65px] mx-4" src={image_base_url+'/'+cardData.logo_path} alt={cardData.provider_name}/>
            <span className="text-second-white text-center block mt-2">{cardData.provider_name}</span>
        </div>
    )
}