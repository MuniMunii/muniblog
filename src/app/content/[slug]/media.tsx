import Image from "next/image"
export function Video({src,alt}:{src:string,alt:string}){
    return <video autoPlay className="w-full rounded-md">
        <source src={src} type="video/mp4"/>
        Your browser does not support the video tag.
    </video>
}
export function OptimizedImage({src,alt}:{src:string,alt:string}){
    return <Image src={src} alt={alt} className="w-full rounded-md"/>
}