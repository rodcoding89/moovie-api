import { useState } from "react"

export default function Search(){
    const [showSearch, setShowSearch] = useState(false);
    return (
        <div className="flex items-center bg-white">
            <input className={`w-[0px] text-black pl-3 box-border absolute left-[50%] translate-x-[-50%] bottom-[-50px] ${showSearch ? 'showInput':'hideInput'}`} placeholder="Rechercher un film, une chaine"/>
            <span onClick={()=>setShowSearch(!showSearch)} className="h-10 bg-yellow flex items-center justify-center p-3 box-border searchBtn">
                <i className="fa fa-search text-lg" aria-hidden="true"></i>
            </span>
        </div>
    )
}