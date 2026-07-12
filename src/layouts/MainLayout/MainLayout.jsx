import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import BottomNav from '@/components/common/BottomNav';
import ScrollToTop from '@/components/common/ScrollToTop';

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  return (
    <div className="main-layout">
      <ScrollToTop />
      <Navbar />
      <main className="fade-in" style={{ paddingTop: isHome ? '0' : '100px' }}>
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default MainLayout;
