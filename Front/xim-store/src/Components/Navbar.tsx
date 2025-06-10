import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaBars, FaTimes, FaSearch, FaHome, FaCogs, FaList, FaThLarge, FaChartBar } from 'react-icons/fa';

const categories = [
  { name: 'Xim', path: '/xim' },
  { name: 'Zen', path: '/zen' },
  { name: 'Reasnow', path: '/reasnow' },
  { name: 'Dma', path: '/dma' },
  { name: 'Optimizer', path: '/optimizer' },
];

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userLoggedIn);
    const userRole = localStorage.getItem('userRole');
    setIsAdmin(userRole === 'admin');
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isSidebarOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const navLinks = (
    <>
      <Link to="/xim" className="text-white hover:text-blue-400 transition duration-300 block md:inline">Xim</Link>
      <Link to="/zen" className="text-white hover:text-blue-400 transition duration-300 block md:inline">Zen</Link>
      <Link to="/reasnow" className="text-white hover:text-blue-400 transition duration-300 block md:inline">Reasnow</Link>
      <Link to="/dma" className="text-white hover:text-blue-400 transition duration-300 block md:inline">Dma</Link>
      <Link to="/optimizer" className="text-white hover:text-blue-400 transition duration-300 block md:inline">Optimizer</Link>
    </>
  );

  const navActions = (
    <>
      <form
        onSubmit={handleSearch}
        className="relative flex items-center w-full md:w-[310px] h-[48px] md:h-[56px] mb-2 md:mb-0"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full h-full px-4 pr-12 rounded-lg bg-[#232341]/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BE3144] transition-all duration-300"
          style={{ backdropFilter: 'blur(10px)' }}
        />
        <button
          type="submit"
          className="absolute right-3 text-gray-400 hover:text-white transition-colors duration-300"
        >
          <FaSearch size={20} />
        </button>
      </form>
      <Link to="/cart" className="text-white hover:text-blue-400 transition duration-300">
        <FaShoppingCart size={24} />
      </Link>
      {isLoggedIn && isAdmin && (
        <Link
          to="/dashboard"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition duration-300"
        >
          Dashboard
        </Link>
      )}
      {isLoggedIn ? (
        <button
          onClick={handleSignOut}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-2 rounded-lg transition duration-300"
        >
          Sign Out
        </button>
      ) : (
        <Link to="/login" className="text-white hover:text-yellow-400 transition duration-300">
          <FaUser size={24} />
        </Link>
      )}
    </>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full bg-[#232341]/80 backdrop-blur-md z-50 px-2 md:px-6 py-2 md:py-0 ${className}`}
        style={{ height: 'auto', minHeight: '64px', padding: 0, borderBottom: 'none', boxShadow: 'none', margin: 0 }}
      >
        {/* Desktop Navbar */}
        <div className="hidden md:flex w-full items-center justify-between">
          {/* Left: Logo */}
          <Link to="/" className="text-white text-2xl font-bold">Game Cheats</Link>
          {/* Center: Nav Links */}
          <div className="flex items-center gap-8 ml-8">
            <Link to="/xim" className="text-white font-medium hover:text-yellow-400 transition">Xim</Link>
            <Link to="/zen" className="text-white font-medium hover:text-yellow-400 transition">Zen</Link>
            <Link to="/reasnow" className="text-white font-medium hover:text-yellow-400 transition">Reasnow</Link>
            <Link to="/dma" className="text-white font-medium hover:text-yellow-400 transition">Dma</Link>
            <Link to="/optimizer" className="text-white font-medium hover:text-yellow-400 transition">Optimizer</Link>
          </div>
          {/* Center: Search Bar */}
          <form onSubmit={handleSearch} className="relative flex items-center w-full max-w-md mx-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Game Cheats"
              className="w-full h-12 px-4 pr-12 rounded-lg bg-[#232341] border border-[#39395a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
              style={{ backdropFilter: 'blur(10px)' }}
            />
            <button
              type="submit"
              className="absolute right-3 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
            >
              <FaSearch size={20} />
            </button>
          </form>
          {/* Right: Cart and Login/Sign Out */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="text-white hover:text-yellow-400 transition duration-300">
              <FaShoppingCart size={24} />
            </Link>
            {isLoggedIn && isAdmin && (
              <Link
                to="/dashboard"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Dashboard
              </Link>
            )}
            {isLoggedIn ? (
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-2 rounded-lg transition duration-300"
              >
                Sign Out
              </button>
            ) : (
              <Link to="/login" className="text-white hover:text-yellow-400 transition duration-300">
                <FaUser size={24} />
              </Link>
            )}
          </div>
        </div>
        {/* Mobile Navbar (unchanged) */}
        <div className="flex md:hidden flex-row justify-between items-center w-full">
          <div className="flex items-center gap-2">
            {/* Hamburger for mobile */}
            <button
              className="md:hidden text-white text-2xl focus:outline-none z-50"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Open menu"
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <Link to="/" className="text-2xl font-bold text-white">
              Game Cheats
            </Link>
          </div>
          {/* Right side: login and cart always visible */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-white hover:text-blue-400 transition duration-300">
              <FaShoppingCart size={24} />
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleSignOut}
                className="text-white hover:text-blue-400 transition duration-300 px-3 py-2"
              >
                Sign Out
              </button>
            ) : (
              <Link to="/login" className="text-white hover:text-blue-400 transition duration-300">
                <FaUser size={24} />
              </Link>
            )}
          </div>
        </div>
      </nav>
      {/* Search Bar always visible below navbar for mobile only */}
      <div className="block md:hidden w-full px-2 md:px-6 pt-[64px] bg-[#232341]/80">
        <form onSubmit={handleSearch} className="relative flex items-center w-full max-w-2xl mx-auto my-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full h-12 px-4 pr-12 rounded-lg bg-[#232341]/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BE3144] transition-all duration-300"
            style={{ backdropFilter: 'blur(10px)' }}
          />
          <button
            type="submit"
            className="absolute right-3 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaSearch size={20} />
          </button>
        </form>
      </div>
      {/* Slide-in Sidebar for Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col">
          <div className="flex justify-between items-center px-6 py-4">
            <span className="text-[#38bdf8] text-xl font-bold">Categories</span>
            <button onClick={() => setIsSidebarOpen(false)} className="text-white text-2xl"><FaTimes /></button>
          </div>
          <div className="flex flex-col gap-4 px-4">
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={cat.path}
                className="w-full flex justify-between items-center bg-[#23232a]/80 backdrop-blur-sm text-white text-lg rounded-lg px-6 py-4 hover:bg-[#232341]/80 transition"
                onClick={() => setIsSidebarOpen(false)}
              >
                {cat.name}
                <span className="text-2xl">{'>'}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;