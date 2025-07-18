const SDCarousel = ({ software }) => {
  const gallery = software?.gallery || [];

  return (
    <div className='bg-white max-w-7xl mx-auto rounded-lg shadow p-8 mt-8 px-2 md:px-8'>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold mb-4">Gallery</h2>
          {gallery.length > 0 ? (
            <>
              <div className="carousel w-full">
                {gallery.map((item, index) => (
                  <div 
                    key={index} 
                    id={`slide${index + 1}`} 
                    className="carousel-item relative w-full"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.caption || `${software.name} screenshot ${index + 1}`}
                      className="w-full object-contain"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                      <a 
                        href={`#slide${index === 0 ? gallery.length : index}`} 
                        className="btn btn-circle"
                      >
                        ❮
                      </a>
                      <a 
                        href={`#slide${index === gallery.length - 1 ? 1 : index + 2}`} 
                        className="btn btn-circle"
                      >
                        ❯
                      </a>
                    </div>
                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                        {item.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex w-full justify-center gap-2 py-2">
                {gallery.map((_, index) => (
                  <a 
                    key={index}
                    href={`#slide${index + 1}`} 
                    className="btn btn-xs"
                  >
                    {index + 1}
                  </a>
                ))}
              </div>
            </>
          ) : (
            <div className="text-gray-500 text-center py-10">
              No gallery images available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SDCarousel;