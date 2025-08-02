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

