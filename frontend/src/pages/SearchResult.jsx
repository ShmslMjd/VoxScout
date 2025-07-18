import { useSearchParams } from 'react-router';
import SRSearchHeader from '../components/SRSearchHeader';
import Navbar from '../components/Navbar';
import SRResultFilter from '../components/SRResultFilter';
import Footer from '../components/Footer';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  return (
    <div className='min-h-screen'>
      <Navbar />
      <SRSearchHeader initialQuery={query} />
      <SRResultFilter searchQuery={query} />
      <Footer/>
    </div>
  );
};

export default SearchResult;