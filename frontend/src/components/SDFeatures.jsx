const SDFeatures = ({ software }) => {
  const features = software?.features || [];

  return (
    <div className='bg-white max-w-7xl mx-auto rounded-lg shadow p-8 mt-8 px-2 md:px-8'>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold mb-4">Features</h2>
          {features.length > 0 ? (
            <div className="join join-vertical w-full">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="collapse collapse-arrow join-item border-base-300 border"
                >
                  <input 
                    type="radio" 
                    name="features-accordion" 
                    defaultChecked={index === 0}
                  />
                  <div className="collapse-title text-lg font-medium">
                    {feature.title}
                  </div>
                  <div className="collapse-content text-gray-600">
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-10">
              No features information available
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SDFeatures