import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import SearchBar from '../SearchBar';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed left-1/2 -translate-x-1/2 top-4 sm:top-7 z-50 w-full max-w-fit px-4 pointer-events-none">
      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md rounded-full pl-4 pr-1.5 py-1.5 border border-black/10 shadow-xl shadow-black/10 pointer-events-auto">
        <Link to="/" className="flex items-center gap-2.5 pr-3 sm:pr-4 group">
          <span className="grid grid-cols-3 gap-[2.5px]">
            <span className="w-1 h-1 rounded-full bg-[#42A85D] group-hover:scale-125 transition-transform"></span>
            <span className="w-1 h-1 rounded-full bg-black/70"></span>
            <span className="w-1 h-1 rounded-full bg-black/30"></span>
            <span className="w-1 h-1 rounded-full bg-black/70"></span>
            <span className="w-1 h-1 rounded-full bg-black/30"></span>
            <span className="w-1 h-1 rounded-full bg-black/70"></span>
            <span className="w-1 h-1 rounded-full bg-black/30"></span>
            <span className="w-1 h-1 rounded-full bg-black/70"></span>
            <span className="w-1 h-1 rounded-full bg-[#42A85D] group-hover:scale-125 transition-transform"></span>
          </span>
          <span className="font-['Geist'] font-semibold text-sm tracking-tight whitespace-nowrap text-[#12281A]">
            Eco Breathe
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-1 text-sm text-black/60">
          {user && (
            <Link to="/dashboard/new-delhi" className="px-3 py-1.5 rounded-full hover:text-black hover:bg-black/5 transition-colors duration-300">
              Dashboard
            </Link>
          )}
          <Link to="/map" className="px-3 py-1.5 rounded-full hover:text-black hover:bg-black/5 transition-colors duration-300">
            Map
          </Link>
          <Link to="/rankings" className="px-3 py-1.5 rounded-full hover:text-black hover:bg-black/5 transition-colors duration-300">
            Rankings
          </Link>
        </div>
        <div className="ml-1 sm:ml-2 flex items-center">
          <div className="hidden sm:block w-48 mr-2">
            <SearchBar placeholder="Search city..." size="sm" />
          </div>
          {user ? (
            <button onClick={handleLogout} className="bg-black/5 hover:bg-black/10 text-black text-sm font-medium px-4 sm:px-5 py-2 rounded-full transition-all duration-300 whitespace-nowrap">
              Log out
            </button>
          ) : (
            <Link to="/auth" className="bg-[#1E4D33] hover:bg-[#2A6647] active:scale-95 text-white text-sm font-medium px-4 sm:px-5 py-2 rounded-full transition-all duration-300 whitespace-nowrap shadow-lg shadow-[#1E4D33]/30">
              Sign Up free
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
