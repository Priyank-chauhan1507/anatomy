import { useContext } from "react";
import {List} from '../App';

function useLists(){

    return useContext(List);
}

function useGlobalSNS(){
    return useContext(List).globalSNS
}





export {
    useGlobalSNS,
    useLists
}