'use client';
import Image from "next/image"
export function Video({src,alt,className}:{src:string,alt:string,className?:string}){
    return <video autoPlay controls muted className={`w-full max-w-[500px] rounded-md ${className??''}`}>
        <source src={src} type="video/mp4"/>
        {alt}
    </video>
}
export function OptimizedImage({src,alt,className,priority,height=300,width=500,quality=80,maxWidth,fill}:{src:string,alt:string,className?:string,priority?:boolean,height?:number,width?:number,quality?:number,maxWidth?:number,fill?:boolean}){
    return <Image src={src} {...(fill
    ? { fill: true }
    : { width: width, height: height })} alt={alt}  priority={priority?true:false} quality={quality} className={`object-cover ${className??''}`} sizes={`(max-width: ${maxWidth??width}px) ${height}, ${width}`}/>
}