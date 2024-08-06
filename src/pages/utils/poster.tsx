import { useState } from "react";

export default function Poster({mask,poster,info}:{mask:string,poster:string,info:any}){
    const [display,setDisplay] = useState(true);
    const [displayMore,setDisplayMore] = useState(false);
    const [textMore,setTextMore] = useState(true);
    return (
        <div>
            <div className="blur fixed z-[0] duration-0 delay-0 ease-in-out inset-0 h-full w-full bg-black"></div>
            <div className="flex justify-center items-center gap-x-9 relative px-[5vw]">
                <div style={{maskImage:`url(${process.env.PUBLIC_URL}/assets/images/cover.svg)`,WebkitMaskImage:`url(${process.env.PUBLIC_URL}/assets/images/cover.svg)`,maskPosition:'left bottom',WebkitMaskPosition: 'left bottom',maskSize:'100%'}} className="absolute left-0 right-0 top-0 bottom-0 opacity-[.075] w-full h-[400px]"><img className="absolute top-0 left-0 object-cover h-full" src={process.env.PUBLIC_URL+'/assets/images/photo.avif'} alt="poster"/></div>
                <div className="w-[290px] py-[5vw] z-10">
                    <img src={process.env.PUBLIC_URL+'/assets/images/photo.avif'} alt="poster" />
                </div>
                <div className="w-[50%] py-[5vw] z-10">
                    <h3 className="text-white text-[2em] mb-0 bold">{info.name}</h3>
                    <span className="text-second-white text-[.75em] block mt-[-8px]">{info.director}</span>
                    <p className="mt-3 mb-1 text-primaire-white text-[.85em]">{info.year}</p>
                    <span className="text-primaire-white text-[.85em]">{info.genre}</span><br/>
                    <span className="text-primaire-white text-[.85em]">{info.rate}</span><br/>
                    <span className="text-primaire-white text-[.85em]">{info.year}</span>
                    <p className={display?'block text-white regular':'hidden text-white'}>{info.shortDes}</p><p className={displayMore?'block text-white regular':'hidden text-white'}>{info.description}</p><span className={displayMore?'idown text-yellow cursor-pointer':'text-yellow cursor-pointer'} onClick={()=>{setDisplayMore(!displayMore);setDisplay(!display);setTextMore(!textMore)}}>{textMore?'Lire plus':'Réduire'}<i className="fa fa-angle-up ml-2 text-yellow" aria-hidden="true"></i></span>
                </div>
                <div className="spectateur z-10 flex-1">
                  <span>Like</span>
                  <div className="bloc flex items-center justify-center my-1"><div className={'left h-1 bg-green-500 '+info.classLike}></div><div className={'right h-1 bg-red-500 '+info.classUnlike}></div></div>
                  <div className="number flex justify-between items-center"><span className="text-[.75em]">{info.like}</span><span className="text-[.75em]">{info.unlike}</span></div>
                </div>
            </div>
        </div>
    )
}