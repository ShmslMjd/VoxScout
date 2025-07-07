import { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {

  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className='bg-base-100 border-b border-base-content/10'>
        <div className="navbar mx-auto max-w-6xl p-4">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg    
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li><a>Compare</a></li>
                    <li><a>Categories</a></li>
                    <li><a>Blog</a></li>
                    <li><a>About Us</a></li>
                    <li><a>Contact</a></li>
                </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link to="/">
                    <img alt="VoxScout logo" src="src/img/favicons/vox-scout-nobg-32.png" />
                </Link>
            </div>
            <div className="navbar-end">
                {!showSearch && (
                    <button className="btn btn-ghost btn-circle" onClick={() => setShowSearch(true)} aria-label="Search">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                )}
                {showSearch && (
                    <div className="relative ml-2">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered w-32 md:w-auto pr-8"
                        autoFocus
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-error"
                        onClick={() => setShowSearch(false)}
                        aria-label="Close search"
                        tabIndex={0}
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                        </svg>
                    </button>
                    </div>
                )}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                        <a className="justify-between">
                            Profile
                        </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
    /*<header className='bg-base-300 border-b border-base-content/10'>
        <div className='mx-auto max-w-6xl p-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter'>
                    Logo Name
                </h1>
                <div className='flex items-center gap-4'>
                    <Link to={'/create'} className='btn btn-primary'>
                    <PlusIcon className='size-5'/>
                    <span>New Software</span>
                    </Link>
                </div>
            </div>

        </div>
    </header>*/
  )
}

export default Navbar