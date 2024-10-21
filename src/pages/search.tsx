import { useState } from "react"
import { Link } from "react-router-dom";
import { options,image_base_url } from "src/constante/data";
import { SearchMovie } from "src/util-function/fontions";

export default function Search(){
    const [showSearch, setShowSearch] = useState(false);
    const [searchData,setSearchData] = useState<any>(null);
    const [searchTerm,setSearchTerm] = useState<string>('')
    const headers = options;
    const handleSearch = async (searchText:string)=>{
        const movieUrl = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=fr-FR&query=${searchText}`;
        const serieUrl = `https://api.themoviedb.org/3/search/tv?include_adult=false&language=fr-FR&query=${searchText}`;
        const personUrl = `https://api.themoviedb.org/3/search/person?include_adult=false&language=fr-FR&query=${searchText}`;
        const data = await SearchMovie([movieUrl,serieUrl,personUrl],headers);
        
        setSearchData(data)
        if (searchText === '') {
            setSearchData(null)
        }
    }
    const handleClick = ()=>{
        setSearchData(null);
        setSearchTerm('');
    }
    //console.log('search data',searchData[2].results)
    return (
        <div className="flex items-center relative bg-white w-[45%] max-700:w-10">
            <input onChange={(e)=>{handleSearch(e.target.value);setSearchTerm(e.target.value)}} className={` text-black pl-3 transition-[width] duration-1000 box-border w-[calc(100%-40px)] max-700:absolute max-700:top-[110px] max-700:left-[50%] max-700:translate-x-[-50%] ${showSearch ? 'max-730:w-[50vw] max-700:h-10 max-430:!w-[75vw]':'max-700:w-0 max-700:h-0'} focus:outline-none`} placeholder="Rechercher un film, une chaine"/>
            <span onClick={()=>setShowSearch(!showSearch)} className="h-10 w-10 bg-yellow flex items-center justify-center p-3 box-border searchBtn">
                <i className="fa fa-search text-lg" aria-hidden="true"></i>
            </span>
            {
                searchData !== null && <div className="h-[400px] w-full bg-black overflow-y-auto absolute top-[40px]">
                    {
                        searchData[0] && <div>
                            <span className="p-3 block">Films trouvés</span>
                            <hr className="pb-5" />
                            <div>
                            {
                                searchData[0].results.map((s:any,index:number)=>{
                                    return (
                                        <Link onClick={()=>handleClick()} to={`../film/${s.id}`} key={index} className="relative px-2 bg-white flex gap-3 items-center justify-start m-1"><img className="h-[35px] w-[35px] object-cover my-1" src={image_base_url+s.poster_path} alt={s.title} /><span className="text-black flex-1 my-2">{s.title}<em className="bg-yellow text-black p-1 text-[.8em] ml-2 rounded-lg">Film</em></span></Link>
                                    )
                                })
                            }
                            </div>
                        </div>
                    }
                    {
                        searchData[1] && <div>
                        <span className="p-3 block">Series trouvés</span>
                        <hr className="pb-5" />
                        <div>
                        {
                            searchData[1].results.map((s:any,index:number)=>{
                                return (
                                    <Link onClick={()=>handleClick()} to={`../serie/${s.id}`} key={index} className="relative px-2 bg-white flex gap-3 items-center justify-start m-1"><img className="h-[35px] w-[35px] object-cover my-1" src={image_base_url+s.poster_path} alt={s.original_name?s.original_name:s.name} /><span className="text-black flex-1 my-2">{s.original_name?s.original_name:s.name}<em className="bg-yellow text-black p-1 text-[.8em] ml-2 rounded-lg">Serie</em></span></Link>
                                )
                            })
                        }
                            </div>
                        </div>
                    }
                    {
                        searchData[2] && <div>
                        <span className="p-3 block">Personnes trouvés</span>
                        <hr className="pb-5" />
                        <div>
                        {
                            searchData[2].results.map((s:any,index:number)=>{
                                return (
                                    <Link onClick={()=>handleClick()} to={`../serie/${s.id}`} key={index} className="relative px-2 bg-white flex gap-3 items-center justify-start m-1"><img className="h-[35px] w-[35px] object-cover my-1" src={s.profile_path !== null ?image_base_url+s.profile_path:process.env.PUBLIC_URL+'/assets/images/profil.svg'} alt={s.original_name?s.original_name:s.name} /><span className="text-black flex-1 my-2">{s.original_name?s.original_name:s.name}<em className="bg-yellow text-black p-1 text-[.8em] ml-2 rounded-lg">{s.known_for_department}</em></span></Link>
                                )
                            })
                        }
                            </div>
                        </div>
                    }

                </div>
            }
        </div>
    )
}