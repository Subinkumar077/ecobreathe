import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import BottomNav from '@/components/common/BottomNav';
import ScrollToTop from '@/components/common/ScrollToTop';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <ScrollToTop />
      <Navbar />
      <main className="fade-in">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default MainLayout;
