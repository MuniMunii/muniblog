import { useEffect,useState } from "react";
export default function useMediaQuery(query: string) {
    const [matches,setMatches]=useState<boolean>(false)
    useEffect(()=>{
        if (typeof window === "undefined") return;
        const mediaQueryList=window.matchMedia(query)
        if(mediaQueryList.matches!==matches){
            setMatches(mediaQueryList.matches)
        }
        const listener=()=>setMatches(mediaQueryList.matches)
        mediaQueryList.addEventListener('change',listener)
        return ()=>mediaQueryList.removeEventListener('change',listener)
    },[matches])
    return matches
}