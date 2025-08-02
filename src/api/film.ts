import axios from "axios"
import { error } from "console";
import { fetchData } from "src/util-function/fontions";
type DataType = Record<string, any>;
export async function UseGetTmDbData(url:string,headers:DataType){
    try {
        const response = await axios.get(url,{headers})
        return {data:response.data,error:null,loading:false}
    } catch (error) {
        return {data:null,error:error,loading:false}
    }
}

export async function getTMDBMovie(url:string,headers:DataType){
    try {
        const response = await axios.get(url,{headers});
        console.log('url from',response.data)
        return response.data
    } catch (error) {
        console.log('error',error);
        return null;
    }
}

export async function UseGetTmDbDataCombined(url1:string, url2:string, headers:DataType) {
    const data = await fetchData([url1,url2],headers);
    return data;
}

export async function UseGetTmDbPersonAndMovieGenre(url1:string, url2:string, headers:DataType) {
    const data = await fetchData([url1,url2],headers);
    return data;
}
const fetchAllShowsWithEpisodes = async (url:string,headers:any) => {
    try {
        // Étape 1: Obtenir les séries en cours de diffusion
        const response = await axios.get(url,{headers});
        const shows = response.data;

        // Étape 2: Pour chaque série, obtenir les détails (saisons et épisodes)
        const detailedShows = await Promise.all(
            shows.results.map(async (show: any) => {
                const detailsResponse = await axios.get(`https://api.themoviedb.org/3/tv/${show.id}?language=en-US`,{headers});
                const details = detailsResponse.data;

                return {
                    details
                };
            })
        );
        return {data:detailedShows,error:null,loading:false};
    } catch (error) {
        console.error('Error fetching shows with episodes:', error);
        return {data:null,error:error,loading:false};
    }
};
export async function UseTVShowsWithCurrentSeason(url:string,headers:DataType) {
  const data = await fetchAllShowsWithEpisodes(url,headers)
  return data
}

export async function UseGetTmDbDataCatCombined(url1:string,url2:string,headers:DataType){
    const data = await fetchData([url1,url2],headers);
    //console.log("fonction",data)
    return data;
}