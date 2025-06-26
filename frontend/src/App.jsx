import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SearchResult from './pages/SearchResult'
import SoftwareDetail from './pages/SoftwareDetail'
import ComparePage from './pages/ComparePage'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/search" element={<SearchResult/>}/>
        <Route path="/software/:id" element={<SoftwareDetail/>}/>
        <Route path="/compare" element={<ComparePage/>}/>
      </Routes>
    </div>
  )
}

export default App