import SRSearchHeader from '../components/SRSearchHeader'
import Navbar from '../components/Navbar'
import SRResultFilter from '../components/SRResultFilter'

const SearchResult = () => {
  return (
    <div className='min-h-screen'>
      <Navbar/>
      <SRSearchHeader/>
      <SRResultFilter/>
    </div>
  )
}

export default SearchResult