import { Link, useParams } from "react-router-dom"
import Teaser from "../utils/teaser";
import InfiniteScroll from 'react-infinite-scroll-component';

import { options,image_base_url } from "src/constante/data";
import { UseGetTmDbData } from "src/hooks/pages-hook";
import MovieDetailCard from "../utils/movie-detail-card";
import { useEffect, useState } from "react";
import { getTMDBMovie } from "src/util-function/fontions";

export default function FilmList(){
    const {name,id} = useParams();
    let cat = name?.replaceAll('-',' ');
    const [currentPage,setCurrentPage] = useState<number | null>(null)
    const [totalPage,setTotalPage] = useState<number | null>(null)
    const [movieListData,setMovieListData] = useState<any[]>([])
    const headers = options;
    const catUrl = cat;
    cat = id === 'upcoming'? 'Les films à venir' : id === 'top_rated' ? 'Les films mieux notés' : id === 'now_playing' ? 'Les film actuellement en salle' : id === 'popular' ? 'Les films populaires' : 'Catégorie '+cat;
    const url = id === 'upcoming' || id === 'top_rated' || id === 'now_playing' || id === 'popular' ? `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`:`https://api.themoviedb.org/3/discover/movie?with_genres=${id}&language=fr`;
    let { data, loading, error } = UseGetTmDbData(url,headers);
    console.log('filmdata',data)
    const movieList:any[] = movieListData.length > 0 ? movieListData.map((d:any,index:number)=>{
        return <MovieDetailCard key={index+'_'+d.original_title} data={d} type="film"/>
    }) : [];
    const fetchData = async ()=>{
        if (currentPage && totalPage && currentPage < totalPage) {
            const actuelPage = currentPage + 1;
            const url = id === 'upcoming' || id === 'top_rated' || id === 'now_playing' || id === 'popular' ? `https://api.themoviedb.org/3/movie/${id}?language=fr-FR&page=${actuelPage}`:`https://api.themoviedb.org/3/discover/movie?with_genres=${id}&language=fr&page=${actuelPage}`;
            const data = await getTMDBMovie(url,headers);
            const newData = [...movieListData,...data.results]
            setMovieListData(newData)
            console.log('feching data',currentPage,totalPage)
            setCurrentPage(actuelPage);
            console.log('feching data',data)
        }
    }
    useEffect(()=>{
        if (data) {
            setMovieListData(data.results)
            setTotalPage(data?.total_pages)
            setCurrentPage(data?.page);
            console.log('new data data',data)
        }
    },[data])
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]"><h4 className="text-black bold text-[2em]">Problème avec le serveur TMDB</h4><p className="text-black">Veuillez nous excuser, car nous rencontrons un problème avec TMDB. Nous vous prions de patienter quelques minutes et de réessayer.</p></div>
        )
    }
    return (
        <div className="content">
            <section className="relative bg-black">
                <Teaser teaserImg={process.env.PUBLIC_URL+'/assets/images/'+catUrl+'.jpg'} description="Bienvenue au bord de votre siège, car il est temps de plonger dans l'action. Des westerns classiques et films de guerre aux aventures de héros d'action modernes." cat={cat}/>
            </section>
            <section>
                {
                    !loading ? <div className="mx-[5vw] my-10">
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