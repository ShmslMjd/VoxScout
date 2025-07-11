import Navbar from "../components/Navbar"
import SDCarousel from "../components/SDCarousel"
import SDFeatures from "../components/SDFeatures"
import SDHero from "../components/SDHero"
import SDOverview from "../components/SDOverview"

const SoftwareDetail = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar/>
      <SDHero/>
      <SDOverview/>
      <SDCarousel/>
      <SDFeatures/>
    </div>
  )
}

export default SoftwareDetail