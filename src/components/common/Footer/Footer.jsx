import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-black/10 bg-[#FBFAF7] w-full">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <span className="grid grid-cols-3 gap-[2.5px]">
            <span className="w-1 h-1 rounded-full bg-[#42A85D]"></span>
            <span className="w-1 h-1 rounded-full bg-black/60"></span>
            <span className="w-1 h-1 rounded-full bg-black/30"></span>
            <span className="w-1 h-1 rounded-full bg-black/60"></span>
            <span className="w-1 h-1 rounded-full bg-black/30"></span>
            <span className="w-1 h-1 rounded-full bg-black/60"></span>
            <span className="w-1 h-1 rounded-full bg-black/30"></span>
            <span className="w-1 h-1 rounded-full bg-black/60"></span>
            <span className="w-1 h-1 rounded-full bg-[#42A85D]"></span>
          </span>
          <span className="font-['Geist'] font-semibold text-sm tracking-tight text-[#12281A]">
            ecoBreathe
          </span>
        </div>
        <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-black/50">
          <Link to="/dashboard/new-delhi" className="hover:text-black transition-colors duration-300">
            Dashboard
          </Link>
          <Link to="/rankings" className="hover:text-black transition-colors duration-300">
            Rankings
          </Link>
          <Link to="/map" className="hover:text-black transition-colors duration-300">
            Map
          </Link>
          <a href="#" className="hover:text-black transition-colors duration-300">
            Contact
          </a>
        </div>
        <p className="text-xs text-black/30">© {new Date().getFullYear()} ecoBreathe</p>
      </div>
    </footer>
  );
};

export default Footer;
