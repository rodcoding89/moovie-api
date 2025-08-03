export default function PostSerie({backImg,seriePostUrl,serieInfo}:{backImg:string,seriePostUrl:string,serieInfo:any}){
    return (
        <div className="h-full pt-[58px]">
            <div className="div1 absolute left-0 right-0 top-0 bottom-0 opacity-[.075] w-full" style={{maskImage:`url(${process.env.PUBLIC_URL}/assets/images/cover.svg)`,WebkitMaskImage:`url(${process.env.PUBLIC_URL}/assets/images/cover.svg)`,maskPosition:'left bottom',WebkitMaskPosition: 'left bottom',maskSize:'100%'}}><img className="img1 absolute top-0 left-0 object-cover h-full" src={backImg} alt="poster"/></div>
                <div className="flex gap-5 items-end justify-start m-10 max-655:!items-center max-480:flex-col">
                    <div className="w-[200px]">
                        <img className="img2 w-[100%]" src={seriePostUrl} alt="twister" />
                    </div>
                    <div className="flex-1 flex items-center justify-between gap-x-10 max-655:flex-col max-655:gap-y-10 max-480:w-full">
                        <div className="w-[50%] max-655:w-full">
                            <h2 className="bold mb-5">{serieInfo.title}</h2>
                            <div className="div3 text-primaire-white gap-4 p-[7px] bg-black mb-1 flex justify-between items-center text-[.85em]">Année: <span className="text-white text-[.85em]">{serieInfo.year}</span> </div>
                            <div className="div4 text-primaire-white gap-4 p-[7px] mb-1 flex justify-between items-center text-[.85em]">Genre: <span className="text-white text-[.85em]">{serieInfo.genre}</span></div>
                            <div className="div5 text-primaire-white gap-4 p-[7px] bg-black mb-1 flex justify-between items-center text-[.85em]">Pays: <span className="text-white text-[.85em]">{serieInfo.country}</span></div>
                            <div className="div6 text-primaire-white gap-4 p-[7px] mb-1 flex justify-between items-center text-[.85em]">Temps: <span className="text-white text-[.85em]">{serieInfo.time}</span></div>
                            <div className="div7 text-primaire-white gap-4 p-[7px] bg-black flex justify-between items-center text-[.85em]">Réalisateur: <span className="text-white text-[.85em]">{serieInfo.director}</span></div>
                        </div>
                        <div className="spectateur z-10 flex-1 max-655:w-full">
                            <div className="bloc flex items-center justify-center my-1">
                                <div className='left h-1 bg-green-500 relative' style={{width:serieInfo.classLike+'%'}}><span className="absolute left-0 -top-7 text-[12px]">Like</span></div>
                                <div className='right h-1 bg-red-500 relative' style={{width:serieInfo.classUnlike+'%'}}><span className="absolute left-0 -top-7 text-[12px]">Unlike</span></div>
                            </div>
                            <div className="number flex justify-between items-center"><span className="like text-[.75em]">{serieInfo.like}</span><span className="unlike text-[.75em]">{serieInfo.unlike}</span></div>
                            <span className="block my-3 text-[12px] text-right">({serieInfo.vote_count}) Votes</span>
                        </div>
                    </div>
                </div>
                <p className="m-10">{serieInfo.description}</p>
        </div>
    )
}