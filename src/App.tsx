import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ContentPage from './pages/content'
import IndexPage from './pages'
import Navbar from './component/navbar'
function App() {
  return (<>
  <Navbar/>
    <BrowserRouter>
    <Routes>
      <Route path={`/`} element={<IndexPage/>}/>
        <Route path={`content/:title`} element={<ContentPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
