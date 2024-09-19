import { Link } from "react-router-dom";

export default function MovieCard({cardData,link}:{cardData:any,link:string}){
    return (
        <div className="w-[165px] mr-4"><Link to={link}><img src={process.env.PUBLIC_URL+'/'+cardData} alt="movie"/></Link></div>
    )
}