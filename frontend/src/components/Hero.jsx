import heroImg from '../img/homePage/heroImg.jpg';

const Hero = () => {
  return (

    <div className="hero bg-base-200 min-h-96">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <img
            src= {heroImg}
            className="max-w-sm rounded-lg shadow-2xl" />
            <div>
                <h1 className="text-5xl font-bold">Find the Right AI Audio tools for you!</h1>
                <p className="py-6">
                    Explore and compare diverse tools to suits your need search now.
                </p>
                <label className="input input-bordered rounded-full input-lg flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                    </svg>
                    <input type="text" className="grow" placeholder="Search" />
                    <button className='btn btn-outline btn-primary rounded-full'>Find AI Tool</button>
                </label>
            </div>
        </div>
    </div>

    /*<section className="relative py-12 overflow-hidden bg-black sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="px-4 mx-auto relativea sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
                <div>
                    <h1 className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl">Find the Right AI Audio tools for you!</h1>
                    <p className="mt-4 text-lg font-normal text-gray-400 sm:mt-8">Explore and compare diverse tools to suits your need search now.</p>

                    <form action="#" className="relative mt-8 rounded-full sm:mt-12">
                        <div className="relative">
                            <div className="absolute rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                            <div className='relative'>
                                <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                                    <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input type="email" name="" id="" placeholder="Start searching" className="block w-full py-4 pr-6 text-white placeholder-gray-500 bg-black border border-transparent rounded-full pl-14 sm:py-5 focus:border-transparent focus:ring-0" />
                            </div>
                        </div>
                        <div className="sm:absolute flex sm:right-1.5 sm:inset-y-1.5 mt-4 sm:mt-0">
                            <button type="submit" className="inline-flex items-center justify-center w-full px-5 py-5 text-sm font-semibold tracking-widest text-black uppercase transition-all duration-200 bg-white rounded-full sm:w-auto sm:py-3 hover:opacity-90">Find an AI tool</button>
                        </div>
                    </form>

                    <div className="mt-8 sm:mt-12">
                        <p className="text-lg font-normal text-white">Trusted by 50k+ users</p>

                        <div className="flex items-center mt-3">
                            <div className='flex'>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>*/
    
  )
}

export default Hero