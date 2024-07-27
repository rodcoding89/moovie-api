import { Link } from "react-router-dom";

export default function MovieCard({cardData}:{cardData:any}){
    return (
        <div className="w-[165px] mr-4"><Link to="/film-detail"><img src={process.env.PUBLIC_URL+'/'+cardData} alt="movie"/></Link></div>
    )
}