import { useState } from 'react';

// Components
import { PublicNavbar } from './components/PublicNavbar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatPublic } from './components/ChatPublic';
import { Toaster } from 'sonner';

// Pages
import { Homepage } from './components/Homepage';
import Home from './pages/Homepage';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { HowItWorks } from './pages/HowItWorks';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { LaporanMingguan } from './pages/LaporanMingguan';
import { AdminChat } from './pages/AdminChat';
import { Transaksi } from './pages/Transaksi';
import { TransaksiApproval } from './pages/TransaksiApproval';

type PublicPage = 'home' | 'about' | 'how-it-works' | 'contact';
type AdminPage = 'login' | 'dashboard' | 'transaksi' | 'laporan' | 'chat';
type Page = PublicPage | AdminPage;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleQuickAdd = () => {
    setCurrentPage('transaksi');
  };

  const handleLoginClick = () => {
    setCurrentPage('login');
  };

  const handleJoinClick = () => {
    setCurrentPage('login');
  };

  const isPublicPage = ['home', 'about', 'how-it-works', 'contact'].includes(currentPage);
  const isAdminPage = isAuthenticated && ['dashboard', 'transaksi', 'laporan', 'chat'].includes(currentPage);

  return (
    <div className="min-h-screen bg-leaf-pattern parallax flex flex-col">
      {/* Navbar Section */}
      {isPublicPage && (
        <PublicNavbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLoginClick={handleLoginClick}
        />
      )}

      {isAdminPage && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
      )}

      {/* Main Content */}
      <div className={`flex-1 ${isPublicPage || isAdminPage ? 'pt-0' : ''}`}>
        {/* Public Pages */}
        {currentPage === 'home' && (
          <>
            {/* Kedua versi punya Home dan Homepage, jadi biarkan keduanya */}
            <Home onJoinClick={handleJoinClick} />
            <Homepage onJoinClick={handleJoinClick} />
          </>
        )}
        {currentPage === 'about' && <About />}
        {currentPage === 'how-it-works' && <HowItWorks onJoinClick={handleJoinClick} />}
        {currentPage === 'contact' && <Contact />}

        {/* Login */}
        {currentPage === 'login' && !isAuthenticated && <Login onLogin={handleLogin} />}

        {/* Admin Pages */}
        {currentPage === 'dashboard' && isAuthenticated && <Dashboard onQuickAdd={handleQuickAdd} />}
        {currentPage === 'transaksi' && isAuthenticated && <TransaksiApproval />}
        {currentPage === 'laporan' && isAuthenticated && <LaporanMingguan />}
        {currentPage === 'chat' && isAuthenticated && <AdminChat />}
      </div>

      {/* Chat Floating Button (Public Only) */}
      {isPublicPage && <ChatPublic />}

      {/* Footer (Hide in Login) */}
      {currentPage !== 'login' && <Footer />}

      <Toaster position="top-right" richColors />
    </div>
  );
}
