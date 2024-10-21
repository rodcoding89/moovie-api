import { useState } from "react";

export default function Poster({mask,poster,info}:{mask:string,poster:string,info:any}){
    const [display,setDisplay] = useState(true);
    const [displayMore,setDisplayMore] = useState(false);
    const [textMore,setTextMore] = useState(true);
    return (
        <div>
            <div className="blur fixed z-[0] duration-0 delay-0 ease-in-out inset-0 h-full w-full bg-black"></div>
            <div className="flex justify-center items-center gap-x-9 relative px-[5vw] max-756:flex-col">
                <div style={{maskImage:`url(${process.env.PUBLIC_URL}/assets/images/cover.svg)`,WebkitMaskImage:`url(${process.env.PUBLIC_URL}/assets/images/cover.svg)`,maskPosition:'left bottom',WebkitMaskPosition: 'left bottom',maskSize:'100%'}} className="div1 absolute left-0 right-0 top-0 bottom-0 opacity-[.075] w-full h-[400px]"><img className="img1 absolute top-0 left-0 object-cover h-full" src={poster} alt={info.name}/></div>
                <div className="w-auto py-[5vw] z-10">
                    <img className="img2" src={poster} alt={info.name} />
                </div>
                <div className="w-[50%] py-[5vw] z-10 max-756:w-full">
                    <h3 className="text-white text-[2em] mb-0 bold">{info.name}</h3>
                    <span className="director text-second-white text-[.75em] block mt-[-8px]">{info.director}</span>
                    <p className="pyear mt-3 mb-1 text-primaire-white text-[.85em]">{info.year}</p>
                    <span className="genre text-primaire-white text-[.85em]">{info.genre}</span><br/>
                    <span className="rate text-primaire-white text-[.85em]">{info.rate}</span><br/>
                    <span className="spanyear text-primaire-white text-[.85em]">{info.country}</span>
                    <p className={display?'shortDes block text-white regular':'hidden text-white'}>{info.shortDes}</p><p className={displayMore?'longDes block text-white regular':'hidden text-white'}>{info.description}</p><span className={displayMore?'imore idown text-yellow cursor-pointer':'imore text-yellow cursor-pointer'} onClick={()=>{setDisplayMore(!displayMore);setDisplay(!display);setTextMore(!textMore)}}>{textMore?'Lire plus':'Réduire'}<i className="fa fa-angle-up ml-2 text-yellow" aria-hidden="true"></i></span>
                </div>
                <div className="spectateur z-10 flex-1 max-756:w-full">
                  <span>Like</span>
                  <div className="bloc flex items-center justify-center my-1"><div className={'div2 left h-1 bg-green-500 '+info.classLike}></div><div className={'div3 right h-1 bg-red-500 '+info.classUnlike}></div></div>
                  <div className="number flex justify-between items-center"><span className="like text-[.75em]">{info.like}</span><span className="unlike text-[.75em]">{info.unlike}</span></div>
                </div>
            </div>
        </div>
    )
}