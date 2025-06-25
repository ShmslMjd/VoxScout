import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SearchResult from './pages/SearchResult'
import SoftwareDetail from './pages/SoftwareDetail'
import ComparePage from './pages/ComparePage'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div data-theme="pastel">
      <button className='btn btn-primary'>Click Me</button>
      <button className="btn">Button</button>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-ghost">Ghost</button>
      <button className="btn btn-link">Link</button>
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