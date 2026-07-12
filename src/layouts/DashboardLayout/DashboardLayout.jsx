import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import BottomNav from '@/components/common/BottomNav';
import ScrollToTop from '@/components/common/ScrollToTop';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <ScrollToTop />
      <Navbar />
      <main className="fade-in" style={{ padding: '100px 20px 40px 20px' }}>
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default DashboardLayout;
