import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import SDAlternative from "../components/SDAlternative"
import SDCarousel from "../components/SDCarousel"
import SDFeatures from "../components/SDFeatures"
import SDHero from "../components/SDHero"
import SDOverview from "../components/SDOverview"
import SDPricing from "../components/SDPricing"
import SDProsCons from "../components/SDProsCons"
import SDReviews from "../components/SDReviews"

const SoftwareDetail = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar/>
      <SDHero/>
      <SDOverview/>
      <SDCarousel/>
      <SDFeatures/>
      <SDProsCons/>
      <SDReviews/>
      <SDPricing/>
      <SDAlternative/>
      <Footer/>
    </div>
  )
}

export default SoftwareDetail