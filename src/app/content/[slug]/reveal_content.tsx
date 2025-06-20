'use client';
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
export default function RevealContent({content}:{content:React.ReactNode}){
      const contentRef=useRef<HTMLDivElement>(null)
      const inView=useInView(contentRef,{once:true})
      const [revealRest,setRevealRest]=useState<boolean>(false)
      useEffect(()=>{if(inView)setRevealRest(true);},[inView])
        useEffect(()=>{
          if(contentRef.current){
            contentRef.current?.querySelectorAll('a').forEach((item)=>{item.setAttribute('target','_blank');item.setAttribute("rel", "noopener noreferrer")})
          }
        },[content])
        return (
            <div ref={contentRef}>{revealRest?content:<p className="text-center text-2xl">Loading...</p>}</div>
        )
}