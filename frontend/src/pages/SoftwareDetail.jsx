import Navbar from "../components/Navbar"
import SDHero from "../components/SDHero"
import SDOverview from "../components/SDOverview"

const SoftwareDetail = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar/>
      <SDHero/>
      <SDOverview/>
    </div>
  )
}

export default SoftwareDetail