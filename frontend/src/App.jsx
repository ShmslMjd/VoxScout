import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SearchResult from './pages/SearchResult'
import SoftwareDetail from './pages/SoftwareDetail'
import ComparePage from './pages/ComparePage'
import CreatePage from './pages/CreatePage'
import UserACcount from './pages/UserAccount'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext';
import SignUpPage from './pages/SignUpPage'
import AboutUsPage from './pages/AboutUsPage'

const App = () => {
  return (
    <AuthProvider>
      <div data-theme="light">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/create" element={<CreatePage/>}/>
          <Route path="/search" element={<SearchResult/>}/>
          <Route path="/software/:id" element={<SoftwareDetail/>}/>
          <Route path="/software/" element={<SoftwareDetail/>}/>
          <Route path="/compare" element={<ComparePage/>}/>
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <UserACcount/>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App