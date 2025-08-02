import { urlPopularMovie, urlPopularSerie, urlTopRatedMovie, urlNowPlayingMovie, urlTopRatedSerie, urlMovieProvider, urlTvProvider, options } from "src/constante/data";
import { UseGetMovie } from "src/util-function/fontions";


export async function HomeData (){
    return await UseGetMovie([urlPopularMovie,urlPopularSerie,urlTopRatedMovie,urlNowPlayingMovie,urlTopRatedSerie,urlMovieProvider,urlTvProvider],options);
}