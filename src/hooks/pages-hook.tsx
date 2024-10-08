import { useEffect, useMemo, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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
  const memoizedUrls = useMemo(() => url, [JSON.stringify(url)]);
  const memoizedHeaders = useMemo(() => headers, [JSON.stringify(headers)]);
  useEffect(()=>{
    let isMounted = true;
    const request = memoizedUrls.map(u=>axios.get(u,{headers:memoizedHeaders}));
    const fetchData = async ()=> {
      try {
        const response = await Promise.all(request);
        if (isMounted) {
          const tmpData = response.map(r=>r.data);
          console.log('author movie',tmpData)
          setData(tmpData);
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
  },[memoizedUrls,memoizedHeaders]);

  return {data ,error, loading}
}
