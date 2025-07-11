import Aiweb from '../img/softwareDetailPage/aiweb1.png';
import Aiweb2 from '../img/softwareDetailPage/aiweb2.png';
import Aiweb3 from '../img/softwareDetailPage/aiweb3.png';
import Aiweb4 from '../img/softwareDetailPage/aiweb4.png';

const SDCarousel = () => {
  return (
    <div className='bg-white max-w-7xl mx-auto rounded-lg shadow p-8 mt-8 px-2 md:px-8'>
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold mb-4">Gallery</h2>
                <div className="carousel w-full">
                    <div id="slide1" className="carousel-item relative w-full">
                        <img
                        src= {Aiweb}
                        className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img
                        src={Aiweb2}
                        className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img
                        src={Aiweb3}
                        className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                        <img
                        src={Aiweb4}
                        className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div>
                <div className="flex w-full justify-center gap-2 py-2">
                    <a href="#slide1" className="btn btn-xs">1</a>
                    <a href="#slide2" className="btn btn-xs">2</a>
                    <a href="#slide3" className="btn btn-xs">3</a>
                    <a href="#slide4" className="btn btn-xs">4</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SDCarousel