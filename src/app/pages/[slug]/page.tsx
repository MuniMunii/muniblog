import React from "react";
type Props={
    params:{slug:string}
}
const Home=async ({params}:Props)=>{
    // const fetchComp=await fetch(`/pages/`)
    return <div className={`${params.slug==="pages"?'text-red-500':'text-green-600'}`}>this is component {params.slug}</div>
}
export default Home