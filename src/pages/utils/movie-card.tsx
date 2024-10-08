import { Link } from "react-router-dom";
import { image_base_url } from "src/constante/data";

export default function MovieCard({cardData,link}:{cardData:any,link:string}){
    return (
        <div className="w-[165px] h-[248px] mr-4"><Link to={link}><img src={image_base_url+cardData.poster_path} alt={cardData.title}/></Link></div>
    )
}