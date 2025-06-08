import './App.css'
import { Route, Routes } from 'react-router-dom'
import ContentPage from './pages/content'
import IndexPage from './pages'
import Navbar from './component/navbar'
import { Helmet } from 'react-helmet'
import ReactLenis from 'lenis/react'
import type { LenisRef } from 'lenis/react'
import { useEffect, useRef } from 'react'
import { cancelFrame, frame } from 'framer-motion'
function App() {
  const lenisRef=useRef<LenisRef>(null)
  useEffect(()=>{
    function update(data:{timestamp:number}){
      const time=data.timestamp
      lenisRef.current?.lenis?.raf(time)
    }
    frame.update(update)
    return ()=>cancelFrame(update)
  },[])
  return (<>
  <Helmet></Helmet>
  <ReactLenis root ref={lenisRef} options={{autoRaf:true,smoothWheel:true,syncTouch:true,duration:1.2}}>
  <Navbar/>
  <div className='mx-auto h-full w-full p-3 max-w-[1000px]'>
    <Routes>
      <Route path={`/`} element={<IndexPage/>}/>
        <Route path={`content/:title`} element={<ContentPage/>}/>
    </Routes>
    </div>
    </ReactLenis>
    </>
  )
}

export default App
