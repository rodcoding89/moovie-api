import { useEffect, useMemo, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { isEqual } from 'lodash';

type DataType = Record<string, any>;
export function UseNavigateTo(url:string,shouldNavigate:boolean){
    const navigate = useNavigate();
    useEffect(()=>{
        if (shouldNavigate) {
            navigate('../' + url);
        }
    },[url,navigate,shouldNavigate])
}

export function UseGetTmDbDataCatCombined(url1:string,url2:string,headers:DataType){
  const [data, setData] = useState<DataType | null>(null);
  const [error, setError] = useState <unknown | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          axios.get(url1, { headers }),
          axios.get(url2, { headers })
        ]);
        if (isMounted) {
          console.log('from hook',res1.data)
          setData({ filmCatData: res1.data, serieCatData: res2.data });
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.log(err)
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => { isMounted = false; };
  }, [url1, url2, headers]);

  return { data, error, loading };
}

export function UseGetTmDbDataCombined(url1:string, url2:string, headers:DataType) {
  console.log('url',url1,url2);
    const [data, setData] = useState<DataType | null>(null);
    const [error, setError] = useState <unknown | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      let isMounted = true;
  
      const fetchData = async () => {
        try {
          const [res1, res2] = await Promise.all([
            axios.get(url1, { headers }),
            axios.get(url2, { headers })
          ]);
          if (isMounted) {
            console.log('from hook',res1.data)
            setData({ filmDetail: res1.data, filmProvider: res2.data });
            setLoading(false);
            setError(null);
          }
        } catch (err) {
          if (isMounted) {
            console.log(err)
            setError(err);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };
  
      fetchData();
  
      return () => { isMounted = false; };
    }, [url1, url2, headers]);
  
    return { data, error, loading };
}

export function UseGetTmDbPersonAndMovieGenre(url1:string, url2:string, headers:DataType) {
  const [data, setData] = useState<DataType | null>(null);
  const [error, setError] = useState <unknown | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          axios.get(url1, { headers }),
          axios.get(url2, { headers })
        ]);
        if (isMounted) {
          console.log('from hook',res1.data)
          setData({ filmGenre: res1.data, otherFilm: res2.data });
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.log(err)
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => { isMounted = false; };
  }, [url1, url2, headers]);

  return { data, error, loading };
}

export function UseGetTmDbData(url:string,headers:DataType){
  const [data,setData] = useState<DataType | null>(null);
  const [error, setError] = useState <unknown | null>(null);
  const [loading, setLoading] = useState(true);
  console.log('url',url)
  useEffect(()=>{
    let isMounted = true;
    if (url) {
      axios.get(url,{headers}).then(res=>{
        if (isMounted) {
          setData(res.data);
          console.log('from hook',res.data)
          setLoading(false);
          setError(null);
        }
      }).catch(err=>{
        if (isMounted) {
          setError(err);
        }
      }).finally(()=>{
        if (isMounted) {
          setLoading(false);
        }
      })
    }
    return ()=> { isMounted = false; }
  },[url,headers])

  return {data,error,loading}
}

export function UseGetMovie(url:string[],headers:DataType){
  const [data,setData] = useState<DataType | null>(null);
  const [error, setError] = useState <unknown | null>(null);
  const [loading, setLoading] = useState(true);
  //const memoizedUrls = useMemo(() => url, [JSON.stringify(url)]);
  //const memoizedHeaders = useMemo(() => headers, [JSON.stringify(headers)]);
  useEffect(()=>{
    let isMounted = true;
    const request = url.map(u=>axios.get(u,{headers:headers}));
    const fetchData = async ()=> {
      try {
        const response = await Promise.all(request);
        if (isMounted) {
          const tmpData = response.map(r=>r.data);
          console.log('author movie',tmpData)
          setData(tmpData);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          setError(error)
        }
      } finally{
        setLoading(false);
      }
    };

    fetchData();

    return ()=> {isMounted = false};
  },[url,headers]);

  return {data ,error, loading}
}
export function UseTVShowsWithCurrentSeason(url:string,headers:DataType) {
  const [data,setData] = useState<DataType | null>(null);
  const [error, setError] = useState <unknown | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllShowsWithEpisodes = async () => {
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

        setData(detailedShows);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching shows with episodes:', error);
        setError(error)
        setLoading(false)
      }
    };

    fetchAllShowsWithEpisodes();
  }, [url,headers]);
  return {data ,error, loading}
}
