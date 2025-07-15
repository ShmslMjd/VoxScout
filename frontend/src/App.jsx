import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SearchResult from './pages/SearchResult'
import SoftwareDetail from './pages/SoftwareDetail'
import ComparePage from './pages/ComparePage'
import CreatePage from './pages/CreatePage'
import UserACcount from './pages/UserACcount'

const App = () => {
  return (
    <div data-theme="light">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create" element={<CreatePage/>}/>
        <Route path="/search" element={<SearchResult/>}/>
        {/*<Route path="/software/:id" element={<SoftwareDetail/>}/>*/}
        <Route path="/software/" element={<SoftwareDetail/>}/>
        <Route path="/compare" element={<ComparePage/>}/>
        <Route path="/profile" element={<UserACcount/>}/>
      </Routes>
    </div>
  )
}

export default App