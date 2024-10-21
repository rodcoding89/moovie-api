import { Link } from "react-router-dom";
import { image_base_url } from "src/constante/data";

export default function MovieDetailCard({data,type}:{data:any,type:string}){
   
    return (
        <Link className="w-[206px] self-stretch" to={'../'+type+'/'+data.id}>
            <div className="w-full">
                <div className="overflow-hidden">
                    <img className="anime w-full h-[309px]" src={image_base_url+data.poster_path} alt={data.original_title} />
                </div>
                <h4 className="text-black bold mt-3 mb-1">{data.original_title}</h4>
                <span className="text-second-white regular">{data.release_date.split('-')[0]}</span>
            </div>
        </Link>
    )
}