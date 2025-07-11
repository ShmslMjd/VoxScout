import React from 'react'

const SDFeatures = () => {
  return (
    <div className='bg-white max-w-7xl mx-auto rounded-lg shadow p-8 mt-8 px-2 md:px-8'>
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold mb-4">Features</h2>
                <div className="join join-vertical w-full">
                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" defaultChecked />
                        <div className="collapse-title text-xl font-medium">Features 1</div>
                        <div className="collapse-content">
                        <p>hello</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">Features 2</div>
                        <div className="collapse-content">
                        <p>hello</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">Features 3</div>
                        <div className="collapse-content">
                        <p>hello</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SDFeatures