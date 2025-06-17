'use client';
import {motion}from 'framer-motion'
import Link from 'next/link'
import { OptimizedImage } from '../lib/media';
import useMediaQuery from '../hook/useMediaQuery';
import { useEffect } from 'react';
export default function ListContent({content}:{content:contentProps[]}){
  const isSmarthphone=useMediaQuery('(max-width:640px)')
  useEffect(()=>console.log(isSmarthphone),[isSmarthphone])
    return content.map((item)=>{console.log(item.thumbnail,item.thumbnail_alt);return (
        <motion.div key={`${item.slug}`} initial={{background:"linear-gradient(135deg,#fb2c36,#f6339a)",transition:{duration:1}}} whileHover={{background:"linear-gradient(315deg,#fb2c36,#f6339a)",transition:{duration:1}}} className="group w-full h-fit text-white p-2 rounded-md">
          <div className=" bg-gradient-to-tr from-[#0d0d0d] to-[#1a1a1a] size-full h-fit p-4 flex md:flex-row max-md:flex-col gap-3 rounded-md">
            <div className="relative md:aspect-[5/2] max-md:aspect-[5/2.6] md:max-w-[300px] md:w-[600px]">
  <OptimizedImage
    fill
    src={item.thumbnail}
    alt={item.thumbnail_alt}
    className="object-cover object-center"
  />
</div>
            <div className='w-10/12'>
            <Link className='group-hover:underline text-2xl' href={`/content/${item.slug}`}>{item.title}</Link>
            <div className='mt-4'>
            <p className='select-none text-blue-400'>Description</p>
            <p>{item.description}</p>
            </div>
            </div>
          </div>
        </motion.div>
    )})
    
}