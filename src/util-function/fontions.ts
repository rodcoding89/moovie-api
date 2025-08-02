import axios from "axios";
type DataType = Record<string, any>;

export async function SearchMovie(url:string[],headers:DataType){
    const request = url.map(u=>axios.get(u,{headers:headers}));
    try {
        const response = await Promise.all(request);
        const tmpData = response.map(r=>r.data);
        console.log('author movie',tmpData)
        return tmpData;
    } catch (error) {
        console.error(error)
      return null;
    }
  }
export function mapOtherMovieInOnTable(data:any){
    let table:any[] = [];
    if (data) {
      if (Object.keys(data).length > 0) {
        Object.keys(data).forEach(key =>{
          if (Array.isArray(data[key])) {
            table.push(...data[key])
          }
        })
      }
    }
    return table;
}
export function mapToTable(data: any) {
    let table: any[] = [];
    if (data) {
        if (Object.keys(data).length > 0) {
            //console.log('test1');
            Object.keys(data).forEach(key => {
                if (data[key]) {
                    
                    Object.keys(data[key]).forEach(k => {
                        //console.log('table', table, 'key', data[key][k]);
                        // Si data[key][k] est un tableau, utilise le spread
                        if (Array.isArray(data[key][k])) {
                            data[key][k].forEach((d:any)=>{
                                d.link = data[key].link;
                                table.push(d);
                            }) 
                            //console.log(data[key].link) // Ajoute les éléments du tableau
                        } else {
                            //table.push(data[key][k]); // Ajoute directement la valeur si ce n'est pas un tableau
                        }

                        // Si tu veux concaténer, utilise concat correctement :
                        // table = table.concat(data[key][k]); // concat retourne un nouveau tableau
                    });
                }else{
                    
                    //console.log('traller link',trallerLink);
                }
            });
            const newtable = table.filter(
                (value, index, self) => 
                index === self.findIndex((obj) => obj.provider_name === value.provider_name)
            );
            //console.log('new table',newtable)
            return newtable;
        }
    }
    return table;
}
export function getTime(minutes:number){
    if (!minutes) {
        return ''
    }
    if (minutes < 60) {
        // Si moins de 60 minutes, juste retourner en format "x minute(s)"
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }

    // Calcul des heures et des minutes restantes
    const hours = Math.floor(minutes / 60);
    //console.log('hours',hours);
    const remainingMinutes = minutes % 60;
    //console.log('remainingMinutes',remainingMinutes);
    // Si aucune minute restante, juste afficher les heures
    if (remainingMinutes === 0) {
        return `${hours} heure${hours !== 1 ? 's' : ''}`;
    }

    // Afficher en format "heures:minutes"
    return `${hours} : ${remainingMinutes < 10 ? '0' : ''}${remainingMinutes} minute${hours !== 1 ? 's' : ''}`;
}

export function formatGenre(genre:any[]=[]){
    return genre ? genre.map((g)=>g.name) :[];
}

export function getDirector(crew:any[]=[]){
    const data = crew ? crew.filter((c:any)=>c.job === 'Director'): [];
    return data.map((d)=>d.name);
}

export const fetchData = async (url:string[],headers:DataType)=> {
    const request = url.map(u=>axios.get(u,{headers:headers}));
    try {
        const response = await Promise.all(request);
        const tmpData = response.map(r=>r.data);
        return {data:tmpData,error:null,loading:false}
    } catch (error) {
        return {data:null,error:error,loading:false}
    }
};

export async function UseGetMovie(url:string[],headers:DataType){
    const data = await fetchData(url,headers);
    return data
}
  