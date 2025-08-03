import { Link, useParams } from "react-router-dom"
import Teaser from "../utils/teaser";
import { options,image_base_url } from "src/constante/data";

import { useEffect, useState } from "react";

import InfiniteScroll from 'react-infinite-scroll-component';
import SerieDetailCard from "../utils/serie-detail-card";
import { getTMDBMovie, UseGetTmDbData } from "src/api/film";

export default function SerieList(){
    const {name,id} = useParams();
    let cat = name?.replaceAll('-',' ');
    const catUrl = cat === 'explore' ? id : cat;
    const headers = options;
    const [currentPage,setCurrentPage] = useState<number | null>(null)
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState<unknown>(null);
    const [totalPage,setTotalPage] = useState<number | null>(null)
    const [movieListData,setMovieListData] = useState<any[]>([])
    cat = id === 'airing_today'? 'Series diffuséés aujourd\'hui' : id === 'top_rated' ? 'Series mieux notés' : id === 'popular' ? 'Series populaires' : 'Toutes nos Séries '+cat+' en Streaming ';
    const url = id === 'airing_today' || id === 'top_rated' || id === 'popular' ? `https://api.themoviedb.org/3/tv/${id}?language=fr-FR`:`https://api.themoviedb.org/3/discover/tv?with_genres=${id}&language=fr`;
   
    const movieList:any[] = movieListData.length > 0 ? movieListData.map((d:any,index:number)=>{
        return <SerieDetailCard key={index+'_'+d.original_title} data={d} type="serie"/>
    }) : [];
    const fetchData = async ()=>{
        if (currentPage && totalPage && currentPage < totalPage) {
            const actuelPage = currentPage + 1;
            const url = id === 'airing_today' || id === 'top_rated' || id === 'popular' ? `https://api.themoviedb.org/3/tv/${id}?language=fr-FR&page=${actuelPage}`:`https://api.themoviedb.org/3/discover/tv?with_genres=${id}&language=fr&page=${actuelPage}`;
            const data = await getTMDBMovie(url,headers);
            const newData = [...movieListData,...data.results]
            setMovieListData(newData)
            console.log('feching data',currentPage,totalPage)
            setCurrentPage(actuelPage);
            console.log('feching data',data)
        }
    }
    useEffect(()=>{
        const loadSerieData = async()=>{
            const {data,error,loading} = await UseGetTmDbData(url,headers)
            setError(error);
            setLoading(loading)
            if (data) {
                setMovieListData(data.results)
                setTotalPage(data?.total_pages)
                setCurrentPage(data?.page);
                console.log('new data data',data)
            }
        }
        loadSerieData()
    },[url])
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]"><h4 className="text-black bold text-[2em]">Problème avec le serveur TMDB</h4><p className="text-black">Veuillez nous excuser, car nous rencontrons un problème avec TMDB. Nous vous prions de patienter quelques minutes et de réessayer.</p></div>
        )
    }
    return (
        <div className="content">
            <section className="bg-black absolute top-0 left-0 h-[100vh] w-full">
                <Teaser teaserImg={process.env.PUBLIC_URL+'/assets/images/'+catUrl+'.jpg'} description="Bienvenue au bord de votre siège, car il est temps de plonger dans l'action. Des westerns classiques et films de guerre aux aventures de héros d'action modernes." cat={cat}/>
            </section>
            <section className="mt-[calc(100vh-100px)]">
                {
                    !loading ? <div className="flex justify-center items-center gap-7 flex-wrap mx-[5vw] my-10">
                    <InfiniteScroll
                        dataLength={movieList.length} //This is important field to render the next data
                        next={fetchData}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                        className="flex justify-center items-center gap-7 flex-wrap"
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                            </p>
                        }
                        >
                        {movieList}
                    </InfiniteScroll>
                    </div> : <div className="w-full my-5 flex items-center justify-center"><div className='loader'></div></div>
                }
            </section>
        </div>
    )
}