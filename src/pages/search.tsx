import { useState } from "react"

export default function Search(){
    const [showSearch, setShowSearch] = useState(false);
    return (
        <div className="flex items-center bg-white w-[45%] max-700:w-10">
            <input className={` text-black pl-3 transition-[width] duration-1000 box-border w-[calc(100%-40px)] max-700:absolute max-700:top-[110px] max-700:left-[50%] max-700:translate-x-[-50%] ${showSearch ? 'max-730:w-[50vw] max-700:h-10 max-430:!w-[75vw]':'max-700:w-0 max-700:h-0'}`} placeholder="Rechercher un film, une chaine"/>
            <span onClick={()=>setShowSearch(!showSearch)} className="h-10 w-10 bg-yellow flex items-center justify-center p-3 box-border searchBtn">
                <i className="fa fa-search text-lg" aria-hidden="true"></i>
            </span>
        </div>
    )
}