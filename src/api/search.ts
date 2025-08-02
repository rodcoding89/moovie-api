import { options } from "src/constante/data";
import { SearchMovie } from "src/util-function/fontions";

export async function searchMoovie(searchText:string){
    const movieUrl = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=fr-FR&query=${searchText}`;
    const serieUrl = `https://api.themoviedb.org/3/search/tv?include_adult=false&language=fr-FR&query=${searchText}`;
    const personUrl = `https://api.themoviedb.org/3/search/person?include_adult=false&language=fr-FR&query=${searchText}`;
    return await SearchMovie([movieUrl,serieUrl,personUrl],options);
}