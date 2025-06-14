'use client';
import {motion}from 'framer-motion'
import Link from 'next/link'
export default function ListContent({content}:{content:contentProps[]}){
    return content.map((content)=>{return (
        <motion.div key={`${content.slug}`} initial={{background:"linear-gradient(135deg,#fb2c36,#f6339a)",transition:{duration:1}}} whileHover={{background:"linear-gradient(315deg,#fb2c36,#f6339a)",transition:{duration:1}}} className=" w-full h-40 text-white p-1">
          <div className="bg-black size-full p-3">
            <Link href={`/content/${content.slug}`}>{content.title}</Link>
          </div>
        </motion.div>
    )})
    
}