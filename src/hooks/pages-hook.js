import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export function UseNavigateTo(url,shouldNavigate){
    const navigate = useNavigate();
    useEffect(()=>{
        if (shouldNavigate) {
            navigate('../' + url);
        }
    },[url,navigate,shouldNavigate])
}